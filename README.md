# Catálogo web IRON PULSE

- Catálogo: https://wiltter.github.io/ironpulse-catalogo/
- Panel: https://wiltter.github.io/ironpulse-catalogo/admin/

Racks 1.0 / 2.0 / 3.0 con despiece, opcionales para sumar a la consulta, comparador y bancos.
Páginas estáticas sin build (GitHub Pages, rama `main`) + base de datos en Supabase (proyecto
`ironpulse`).

## El panel

Todo se cambia desde el panel: precios, costos, textos, piezas y fotos. Cada cambio queda en
**Historial** con quién y cuándo.

| Pestaña | Para qué |
| --- | --- |
| **Precios** | Costo, ganancia, precio calculado, precio fijo y margen real de cada producto y opcional. El cliente ve el **publicado**: el fijo si hay, si no el calculado |
| **Materiales** | Precio de cada chapa, caño y bulón. Al cambiar uno, muestra cómo quedan los productos antes de guardar. Naranja = precio todavía heredado del Excel |
| **Productos** | Receta de cada máquina (materiales, mano de obra, pintura…), lo que ve el cliente, despiece, opcionales (con su propio costo) y fotos |
| **Página** | WhatsApp, Instagram, título y subtítulo |
| **Usuarios** | Activar a quien se registró. Nadie ve costos hasta estar activo |
| **Historial** | Los últimos cambios |

**Sumar a un socio:** que entre al panel, toque "Crear cuenta" y confirme el mail. Aparece en
Usuarios como pendiente y lo activás.

### Cómo calcula (igual que el Excel de costos)

- Chapa: precio de la plancha × uso ÷ largo de la plancha.
- Caño / barra: precio de la barra × cantidad de barras. Por unidad: precio × cantidad.
- Mano de obra: horas × tarifa por hora (pestaña Materiales).
- Corte de chapa, corte estructural y plegado: % sobre los materiales marcados en esas columnas.
- Pintura, tapizado, CNC: monto fijo por producto.
- Precio calculado = costo × (1 + ganancia), redondeado a $1.000.

## Seguridad

Los costos, márgenes y proveedores están en tablas que **solo pueden leer usuarios activos**: lo
garantiza la base (RLS), no la página. El catálogo público lee productos, piezas, config y la función
`precios_publicos()`, que devuelve únicamente el precio publicado. Esquema en
`supabase/migraciones/`. **Ningún costo se guarda en este repo**: es público.

## Fotos

- Desde el panel: "+ foto" → subir. Se achican solas (1600 y 640 px, WebP) y van a Supabase Storage.
- Las del repo están en `img/` (grande) e `img/th/` (miniatura), y listadas en `img/lista.json`.

Solo fotos reales o renders de las piezas. Nada generado.

## El respaldo (`datos.js`)

Si la base no responde (sin internet, proyecto pausado), la página muestra `datos.js`. Después de
cambios grandes:

```
python actualizar_respaldo.py
```

y subir `datos.js`. Lee solo lo público.

## Historia

Hasta el 14/10/2026 los datos salían de la Google Sheet "IRON PULSE — Catálogo web". Quedó
congelada, no se borró. Ya no se usa: todo se edita en el panel.
