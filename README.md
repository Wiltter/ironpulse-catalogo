# Catálogo web IRON PULSE

Página: https://wiltterl.github.io/ironpulse-catalogo/

Racks 1.0 / 2.0 / 3.0 con cada pieza en foto real, comparador y bancos. Un solo `index.html`, sin
build. Se publica con GitHub Pages desde la rama `main`.

## Cómo cambiar precios, textos y piezas

Todo se edita en la Google Sheet **"IRON PULSE — Catálogo web"**:
https://docs.google.com/spreadsheets/d/1D0yxLu815UQUJ30Yw8DtjAwiCArUMCQjrFJqIfudBlw/edit

Cambiás una celda, recargás la página y ya está. No hace falta tocar código ni subir nada.

> **Una sola vez:** la Sheet tiene que estar compartida como *"Cualquier persona con el enlace →
> Lector"* (botón Compartir). Si no, la página no la puede leer y muestra el respaldo.

| Pestaña | Qué tiene |
| --- | --- |
| **Productos** | Una fila por producto. `precio` sin puntos (ej. `1477750`); vacío = "Consultar precio". `visible` en `NO` lo oculta. `specs` separadas con `\|`. `fotos` separadas con coma. `categoria`: `rack` va arriba con despiece; `otro` va en "También fabricamos". `orden` define el orden |
| **Piezas** | Una fila por pieza de cada rack (`producto_id` = el `id` del rack). `tipo`: `incluido` (viene con el rack) u `opcional` (sale en "Para sumar" y el cliente lo marca para la consulta). `precio` solo para opcionales; vacío = "Precio a confirmar". Las incluidas con `foto` salen como tarjeta; todas las incluidas salen en "Despiece completo". Para el despiece se usan los renders (`render_…`) primero y después las fotos reales |
| **Config** | Número de WhatsApp (con 54, sin +), usuario de Instagram, título y subtítulo |

**Nunca** cargar costos ni rentabilidad: la Sheet la puede leer cualquiera que tenga el link.

## Cómo sumar una foto

1. La foto va a `img/` (grande, ~1600 px) y a `img/th/` (miniatura, ~640 px), con el mismo nombre,
   en `.webp`. Ej.: `img/pieza_barra-dominadas.webp` + `img/th/pieza_barra-dominadas.webp`.
2. En la Sheet se escribe el nombre sin extensión: `pieza_barra-dominadas`.
3. Subir los archivos al repo (desde github.com → *Add file → Upload files*, o pedírselo a Claude).

Solo fotos reales. Nada de renders ni imágenes generadas.

## El respaldo (`datos.js`)

Si la Sheet no responde, la página muestra `datos.js`. Para que el respaldo no quede viejo, después
de cambios grandes:

```
python actualizar_respaldo.py
```

y subir `datos.js` y `datos/`.
