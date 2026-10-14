// Conexión a la base del catálogo (Supabase, proyecto "IronPulseCatalogo", cuenta Wiltter).
// La clave es la "anon": NO es secreta, Supabase la diseñó para vivir en el navegador.
// Lo privado (costos, márgenes, proveedores) lo protegen los permisos de la base (RLS),
// no esta clave. Ver supabase/migraciones/001_esquema.sql.
window.IP_SUPABASE = {
  url: 'https://grghwoytlaijfkvgrrte.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZ2h3b3l0bGFpamZrdmdycnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5ODM3NDksImV4cCI6MjEwNzU1OTc0OX0.3FzSrY6JuZvydMPvLJz-qxRyHJdGBIQMvsitC7tejSI'
};
