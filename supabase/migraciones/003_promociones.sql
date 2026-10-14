-- =====================================================================
-- Promociones: etiquetas de tiempo limitado y descuentos.
-- Las promos son privadas (una promo programada no se ve hasta que empieza).
-- El público recibe el resultado ya calculado con la hora real en catalogo_precios():
-- cuando una promo vence, desaparece sola.
-- =====================================================================

create table public.promociones (
  id               bigint generated always as identity primary key,
  etiqueta         text not null,                       -- "Oferta de primavera", "Últimas unidades"
  tipo             text not null default 'porcentaje' check (tipo in ('porcentaje','monto','ninguno')),
  valor            numeric not null default 0,          -- 15 = 15% · 100000 = $100.000 · ninguno = solo etiqueta
  desde            timestamptz not null default now(),
  hasta            timestamptz,                         -- null = sin fecha de fin
  cuenta_regresiva boolean not null default false,      -- el cliente ve "termina en…"
  todo_el_catalogo boolean not null default false,
  activa           boolean not null default true,       -- pausar sin borrar
  creado_en        timestamptz not null default now(),
  check (hasta is null or hasta > desde),
  check (valor >= 0)
);

create table public.promocion_items (
  id           bigint generated always as identity primary key,
  promocion_id bigint not null references public.promociones(id) on delete cascade,
  producto_id  text references public.productos(id) on delete cascade on update cascade,
  pieza_id     bigint references public.piezas(id) on delete cascade,
  check ((producto_id is null) <> (pieza_id is null)),
  unique (promocion_id, producto_id),
  unique (promocion_id, pieza_id)
);
create index on public.promocion_items (promocion_id);
create index on public.promocion_items (producto_id);
create index on public.promocion_items (pieza_id);

alter table public.promociones     enable row level security;
alter table public.promocion_items enable row level security;
create policy admins_promociones on public.promociones     for all to authenticated using (public.es_admin()) with check (public.es_admin());
create policy admins_promo_items on public.promocion_items for all to authenticated using (public.es_admin()) with check (public.es_admin());
revoke all on public.promociones, public.promocion_items from anon;

create trigger historial_promociones after insert or update or delete on public.promociones
  for each row execute function public.registrar_cambio();
create trigger historial_promocion_items after insert or update or delete on public.promocion_items
  for each row execute function public.registrar_cambio();

-- precio con descuento: el % se redondea igual que el precio calculado; el monto, al peso
create or replace function public.precio_con_promo(p_precio numeric, p_tipo text, p_valor numeric, p_redondeo int)
returns numeric language sql immutable set search_path = public as $$
  select case
    when p_precio is null then null
    when p_tipo = 'porcentaje' then greatest(round(p_precio * (1 - p_valor / 100) / greatest(p_redondeo, 1)) * greatest(p_redondeo, 1), 0)
    when p_tipo = 'monto'      then greatest(p_precio - p_valor, 0)
    else p_precio end;
$$;

-- Lo que ve el catálogo: precio final, precio de lista y la promo vigente (si hay).
-- Si a un ítem le tocan varias promos gana la de menor precio final; las de "solo etiqueta"
-- solo se muestran si no hay ninguna con descuento.
-- promo_hasta viene solo si la promo pidió cuenta regresiva.
create or replace function public.catalogo_precios()
returns table (producto_id text, pieza_id bigint, precio numeric, precio_lista numeric,
               promo_etiqueta text, promo_tipo text, promo_valor numeric, promo_hasta timestamptz)
language sql stable security definer set search_path = public as $$
  with base as (
    select p.id as producto_id, null::bigint as pieza_id, coalesce(pr.redondeo, 1000) as red,
           coalesce(pr.precio_manual,
                    public.precio_sugerido(public.costo(p.id, null), coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000))) as lista
    from productos p left join precios pr on pr.producto_id = p.id
    where p.visible
    union all
    select z.producto_id, z.id, coalesce(pr.redondeo, 1000),
           coalesce(pr.precio_manual,
                    public.precio_sugerido(public.costo(null, z.id), coalesce(pr.ganancia, 0.8), coalesce(pr.redondeo, 1000)))
    from piezas z left join precios pr on pr.pieza_id = z.id
    where z.tipo = 'opcional'
  ), vigentes as (
    select * from promociones
    where activa and desde <= now() and (hasta is null or hasta > now())
  ), cand as (
    select b.producto_id, b.pieza_id, v.id as promo_id, v.etiqueta, v.tipo, v.valor, v.hasta, v.cuenta_regresiva,
           public.precio_con_promo(b.lista, v.tipo, v.valor, b.red) as final,
           (v.tipo = 'ninguno' or b.lista is null) as solo_etiqueta
    from base b
    join vigentes v on v.todo_el_catalogo or exists (
      select 1 from promocion_items i
      where i.promocion_id = v.id
        and ((b.pieza_id is null and i.producto_id = b.producto_id and i.pieza_id is null)
          or (b.pieza_id is not null and i.pieza_id = b.pieza_id)))
  ), mejor as (
    select distinct on (producto_id, pieza_id) *
    from cand
    order by producto_id, pieza_id, solo_etiqueta, final asc nulls last, promo_id desc
  )
  select b.producto_id, b.pieza_id,
         case when m.solo_etiqueta then b.lista else coalesce(m.final, b.lista) end,
         b.lista, m.etiqueta,
         case when m.solo_etiqueta then 'ninguno' else m.tipo end,
         case when m.solo_etiqueta then null else m.valor end,
         case when m.cuenta_regresiva then m.hasta end
  from base b
  left join mejor m on m.producto_id = b.producto_id and m.pieza_id is not distinct from b.pieza_id;
$$;

revoke execute on function public.catalogo_precios() from public;
grant  execute on function public.catalogo_precios() to anon, authenticated;
comment on function public.catalogo_precios() is 'Pública a propósito: precio final, de lista y promo vigente de lo visible. Sin costos ni márgenes. Las promos programadas no aparecen hasta que empiezan.';
