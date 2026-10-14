-- =====================================================================
-- IRON PULSE · catálogo + panel de costos
-- Esquema solo (sin datos). Los datos se cargan aparte y nunca pasan por el repo.
--
-- Regla de oro: ningún costo, margen ni proveedor llega al navegador de un cliente.
--   · Tablas públicas  (productos, piezas, config): las lee cualquiera, las editan admins.
--   · Tablas privadas  (materiales, receta, costos, precios, ajustes, admins, historial):
--     solo admins activos. El público ve precios únicamente por precios_publicos().
-- =====================================================================

-- ---------- quién puede editar ----------
create table public.admins (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  email     text not null,
  nombre    text,
  estado    text not null default 'pendiente' check (estado in ('pendiente','activo','inactivo')),
  creado_en timestamptz not null default now()
);

create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid() and estado = 'activo');
$$;

-- toda cuenta nueva entra pendiente; un admin la aprueba desde el panel
create or replace function public.alta_usuario() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.admins (user_id, email, nombre, estado)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nombre', ''), 'pendiente')
  on conflict (user_id) do nothing;
  return new;
end $$;

create trigger al_crear_usuario
  after insert on auth.users for each row execute function public.alta_usuario();

-- ---------- públicas: lo que muestra el catálogo ----------
create table public.productos (
  id          text primary key,
  orden       int not null default 99,
  categoria   text not null default 'rack' check (categoria in ('rack','otro')),
  visible     boolean not null default true,
  nombre      text not null,
  etiqueta    text,
  bajada      text,
  fotos       text[] not null default '{}',
  specs       text[] not null default '{}',
  fijacion    text,
  tipo        text,
  crece_a     text,
  nota_precio text default 'Precio contado'
);

create table public.piezas (
  id          bigint generated always as identity primary key,
  producto_id text not null references public.productos(id) on delete cascade on update cascade,
  orden       int not null default 99,
  tipo        text not null default 'incluido' check (tipo in ('incluido','opcional')),
  cantidad    int not null default 1,
  pieza       text not null,
  medida      text,
  detalle     text,
  fotos       text[] not null default '{}'
);
create index on public.piezas (producto_id);

create table public.config (
  clave text primary key,
  valor text
);

-- ---------- privadas: costos ----------
create table public.materiales (
  id              bigint generated always as identity primary key,
  codigo          text,
  nombre          text not null,
  tipo            text not null check (tipo in ('chapa','barra','unidad')),
  unidad          text,
  largo           numeric,          -- chapa: largo de la plancha en m (el costo es precio × uso / largo)
  ancho           numeric,
  precio          numeric not null default 0,
  corte           text check (corte in ('chapa','estructural')),  -- entra en la base del % de corte
  plegado         boolean not null default false,                   -- entra en la base del % de plegado
  proveedor       text,
  actualizado_en  timestamptz,      -- null = precio heredado del Excel, sin actualizar
  actualizado_por text
);

-- una línea de material de un producto (o de un opcional)
create table public.receta (
  id          bigint generated always as identity primary key,
  producto_id text references public.productos(id) on delete cascade on update cascade,
  pieza_id    bigint references public.piezas(id) on delete cascade,
  material_id bigint not null references public.materiales(id) on delete restrict,
  cantidad    numeric not null default 0,   -- chapa: uso · barra: barras · unidad: unidades
  nota        text,
  check ((producto_id is null) <> (pieza_id is null))
);
create index on public.receta (producto_id);
create index on public.receta (pieza_id);
create index on public.receta (material_id);

-- mano de obra, porcentajes y fijos (pintura, tapizado, CNC…)
create table public.costos_producto (
  id          bigint generated always as identity primary key,
  producto_id text references public.productos(id) on delete cascade on update cascade,
  pieza_id    bigint references public.piezas(id) on delete cascade,
  orden       int not null default 99,
  concepto    text not null,
  tipo        text not null check (tipo in ('horas','pct_corte_chapa','pct_corte_estructural','pct_plegado','fijo')),
  valor       numeric not null default 0,
  check ((producto_id is null) <> (pieza_id is null))
);
create index on public.costos_producto (producto_id);
create index on public.costos_producto (pieza_id);

create table public.precios (
  id            bigint generated always as identity primary key,
  producto_id   text unique references public.productos(id) on delete cascade on update cascade,
  pieza_id      bigint unique references public.piezas(id) on delete cascade,
  ganancia      numeric not null default 0.8,     -- sobre el costo: 0,8 = costo × 1,8
  redondeo      int not null default 1000,
  precio_manual numeric,                           -- null = se publica el calculado
  check ((producto_id is null) <> (pieza_id is null))
);

create table public.ajustes (
  clave       text primary key,
  valor       numeric not null,
  descripcion text
);

create table public.historial (
  id      bigint generated always as identity primary key,
  cuando  timestamptz not null default now(),
  quien   text,
  tabla   text not null,
  accion  text not null,
  antes   jsonb,
  despues jsonb
);
create index on public.historial (cuando desc);

-- ---------- cálculo (una sola vez, en la base) ----------
-- Replica el Excel "PIEZAS MAQUINAS IP y costos", pestaña COSTO BANCOS:
--   chapa  = precio × uso / largo · barra y unidad = precio × cantidad
--   horas  = horas × tarifa_hora  · pct_* = % sobre la base marcada en materiales · fijo = monto
-- Corre con los permisos de quien la llama: para un anónimo las tablas privadas están vacías.
create or replace function public.costo(p_producto text, p_pieza bigint default null)
returns numeric language sql stable set search_path = public as $$
  with mat as (
    select m.tipo, m.corte, m.plegado,
           case when m.tipo = 'chapa' then m.precio * r.cantidad / nullif(m.largo, 0)
                else m.precio * r.cantidad end as sub
    from receta r join materiales m on m.id = r.material_id
    where (p_pieza is null and r.producto_id = p_producto) or (p_pieza is not null and r.pieza_id = p_pieza)
  ), t as (
    select coalesce(sum(sub), 0)                                   as materiales,
           coalesce(sum(sub) filter (where corte = 'chapa'), 0)       as base_chapa,
           coalesce(sum(sub) filter (where corte = 'estructural'), 0) as base_estructural,
           coalesce(sum(sub) filter (where plegado), 0)               as base_plegado
    from mat
  ), extra as (
    select coalesce(sum(case c.tipo
             when 'horas'                 then c.valor * coalesce((select valor from ajustes where clave = 'tarifa_hora'), 0)
             when 'pct_corte_chapa'       then c.valor / 100 * t.base_chapa
             when 'pct_corte_estructural' then c.valor / 100 * t.base_estructural
             when 'pct_plegado'           then c.valor / 100 * t.base_plegado
             else c.valor end), 0) as v
    from costos_producto c cross join t
    where (p_pieza is null and c.producto_id = p_producto) or (p_pieza is not null and c.pieza_id = p_pieza)
  )
  select round(t.materiales + extra.v, 2) from t, extra;
$$;

create or replace function public.precio_sugerido(p_costo numeric, p_ganancia numeric, p_redondeo int)
returns numeric language sql immutable set search_path = public as $$
  select case when coalesce(p_costo, 0) <= 0 then null
              else round(p_costo * (1 + p_ganancia) / greatest(p_redondeo, 1)) * greatest(p_redondeo, 1) end;
$$;

-- vista del panel (respeta RLS: un no-admin ve todo en cero)
create view public.resumen_precios with (security_invoker = true) as
  select 'producto'::text as clase, p.id as producto_id, null::bigint as pieza_id, p.nombre, p.categoria, p.orden,
         null::text as rack, c.costo, pr.ganancia, pr.redondeo, pr.precio_manual,
         public.precio_sugerido(c.costo, coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000)) as sugerido
  from productos p
  left join precios pr on pr.producto_id = p.id
  cross join lateral (select public.costo(p.id, null) as costo) c
  union all
  select 'opcional', z.producto_id, z.id, z.pieza, 'opcional', 1000 + z.orden,
         (select nombre from productos where id = z.producto_id), c.costo, pr.ganancia, pr.redondeo, pr.precio_manual,
         public.precio_sugerido(c.costo, coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000))
  from piezas z
  left join precios pr on pr.pieza_id = z.id
  cross join lateral (select public.costo(null, z.id) as costo) c
  where z.tipo = 'opcional';

-- lo ÚNICO de precios que ve el público: id → precio publicado (manual o calculado)
create or replace function public.precios_publicos()
returns table (producto_id text, pieza_id bigint, precio numeric)
language sql stable security definer set search_path = public as $$
  select p.id, null::bigint,
         coalesce(pr.precio_manual,
                  public.precio_sugerido(public.costo(p.id, null), coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000)))
  from productos p left join precios pr on pr.producto_id = p.id
  where p.visible
  union all
  select z.producto_id, z.id,
         coalesce(pr.precio_manual,
                  public.precio_sugerido(public.costo(null, z.id), coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000)))
  from piezas z left join precios pr on pr.pieza_id = z.id
  where z.tipo = 'opcional';
$$;

-- ---------- historial y sellos ----------
create or replace function public.registrar_cambio() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.historial (quien, tabla, accion, antes, despues)
  values (coalesce(auth.jwt() ->> 'email', 'sistema'), tg_table_name, tg_op,
          case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) end,
          case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) end);
  return coalesce(new, old);
end $$;

do $$
declare t text;
begin
  foreach t in array array['productos','piezas','config','materiales','receta','costos_producto','precios','ajustes','admins'] loop
    execute format('create trigger historial_%1$s after insert or update or delete on public.%1$I
                    for each row execute function public.registrar_cambio()', t);
  end loop;
end $$;

create or replace function public.sellar_material() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.precio is distinct from old.precio then
    new.actualizado_en := now();
    new.actualizado_por := coalesce(auth.jwt() ->> 'email', 'sistema');
  end if;
  return new;
end $$;
create trigger sellar_material before update on public.materiales
  for each row execute function public.sellar_material();

-- ---------- permisos (RLS) ----------
alter table public.productos       enable row level security;
alter table public.piezas          enable row level security;
alter table public.config          enable row level security;
alter table public.materiales      enable row level security;
alter table public.receta          enable row level security;
alter table public.costos_producto enable row level security;
alter table public.precios         enable row level security;
alter table public.ajustes         enable row level security;
alter table public.admins          enable row level security;
alter table public.historial       enable row level security;

-- públicas: leer cualquiera, escribir admins
create policy leer_productos on public.productos for select to anon, authenticated using (true);
create policy leer_piezas    on public.piezas    for select to anon, authenticated using (true);
create policy leer_config    on public.config    for select to anon, authenticated using (true);
create policy editar_productos on public.productos for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy editar_piezas    on public.piezas    for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy editar_config    on public.config    for all to authenticated using (public.es_admin()) with check (public.es_admin());

-- privadas: solo admins activos
create policy admins_materiales on public.materiales      for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_receta     on public.receta          for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_costos     on public.costos_producto for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_precios    on public.precios         for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_ajustes    on public.ajustes         for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_historial  on public.historial       for select to authenticated using (public.es_admin());

-- cada uno ve su propia fila (para saber si está pendiente); los admins ven y editan todas
create policy ver_mi_cuenta   on public.admins for select to authenticated using (user_id = auth.uid() or public.es_admin());
create policy editar_cuentas  on public.admins for update to authenticated using (public.es_admin()) with check (public.es_admin());

-- cinturón y tiradores: el rol anónimo no tiene ni el permiso de tabla en lo privado
revoke all on public.materiales, public.receta, public.costos_producto, public.precios,
              public.ajustes, public.admins, public.historial, public.resumen_precios from anon;
revoke insert, update, delete, truncate on public.productos, public.piezas, public.config from anon;
revoke execute on function public.costo(text, bigint) from public, anon;
grant  execute on function public.costo(text, bigint) to authenticated;
revoke execute on function public.alta_usuario(), public.registrar_cambio(), public.sellar_material() from public, anon, authenticated;
grant  execute on function public.precios_publicos() to anon, authenticated;

-- ---------- fotos subidas desde el panel ----------
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true)
on conflict (id) do nothing;

create policy fotos_ver    on storage.objects for select to authenticated using (bucket_id = 'fotos' and public.es_admin());
create policy fotos_subir  on storage.objects for insert to authenticated with check (bucket_id = 'fotos' and public.es_admin());
create policy fotos_editar on storage.objects for update to authenticated using (bucket_id = 'fotos' and public.es_admin());
create policy fotos_borrar on storage.objects for delete to authenticated using (bucket_id = 'fotos' and public.es_admin());
