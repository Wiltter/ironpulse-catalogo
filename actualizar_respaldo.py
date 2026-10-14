"""Actualiza el respaldo del catálogo (datos.js) con lo que hay en la base del panel.

La página siempre intenta leer la base en vivo. datos.js es lo que se muestra si la base no
responde (sin internet, proyecto pausado, Supabase caído). Correr esto de vez en cuando, después
de cambios grandes, y subir el resultado:

    python actualizar_respaldo.py

Lee SOLO lo público (productos, piezas, config y precios_publicos), con la misma clave que usa
la página. Costos y márgenes no son accesibles con esa clave, así que no pueden terminar acá.
"""
import json
import pathlib
import re
import urllib.request

AQUI = pathlib.Path(__file__).parent
cfg = (AQUI / "supabase-config.js").read_text(encoding="utf-8")
URL = re.search(r"url:\s*'([^']*)'", cfg).group(1)
KEY = re.search(r"key:\s*'([^']*)'", cfg).group(1)


def pedir(ruta, cuerpo=None):
    req = urllib.request.Request(f"{URL}/rest/v1/{ruta}", data=cuerpo,
                                 headers={"apikey": KEY, "Authorization": f"Bearer {KEY}",
                                          "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    datos = {
        "productos": pedir("productos?select=*&order=orden"),
        "piezas": pedir("piezas?select=*&order=producto_id,orden"),
        "config": pedir("config?select=*&order=clave"),
        # el respaldo va SIN promos: si la base se cae, mejor precio de lista que una oferta vencida
        "precios": [{"producto_id": x["producto_id"], "pieza_id": x["pieza_id"], "precio": x["precio_lista"]}
                    for x in pedir("rpc/catalogo_precios", b"{}")],
    }
    if not datos["productos"]:
        raise SystemExit("La base devolvió 0 productos: no piso el respaldo.")
    js = ("// Respaldo del catálogo. Lo genera actualizar_respaldo.py: no editar a mano.\n"
          "window.CATALOGO_RESPALDO = " + json.dumps(datos, ensure_ascii=False, indent=1) + ";\n")
    (AQUI / "datos.js").write_text(js, encoding="utf-8")
    print(f"datos.js actualizado: {len(datos['productos'])} productos, {len(datos['piezas'])} piezas.")


if __name__ == "__main__":
    main()
