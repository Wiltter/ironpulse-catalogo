-- es_admin() solo la necesitan las políticas de usuarios logueados.
revoke execute on function public.es_admin() from public, anon;
grant  execute on function public.es_admin() to authenticated;
-- precios_publicos() es pública a propósito: devuelve solo id → precio publicado.
comment on function public.precios_publicos() is 'Pública a propósito: lo único de precios que ve el catálogo (id → precio publicado). Sin costos ni márgenes.';
