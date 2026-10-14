"""Actualiza el respaldo del catálogo (datos.js) con lo que hay en la Google Sheet.

La página siempre intenta leer la Sheet en vivo. datos.js es lo que se muestra si la Sheet no
responde (sin internet, planilla privada, Google caído). Correr esto de vez en cuando, después de
cambios grandes, y subir el resultado:

    python actualizar_respaldo.py

Si la Sheet no responde, arma datos.js con los CSV que ya están en datos/.
"""
import json
import pathlib
import urllib.request

SHEET_ID = "1D0yxLu815UQUJ30Yw8DtjAwiCArUMCQjrFJqIfudBlw"
PESTANAS = {"productos": "Productos", "piezas": "Piezas", "config": "Config"}
AQUI = pathlib.Path(__file__).parent
DATOS = AQUI / "datos"


def bajar(pestana):
    url = (f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq"
           f"?tqx=out:csv&headers=1&sheet={pestana}")
    with urllib.request.urlopen(url, timeout=15) as r:
        texto = r.read().decode("utf-8")
    if texto.lstrip().startswith("<"):
        raise RuntimeError("la Sheet devolvió HTML (¿está compartida por link?)")
    return texto


def main():
    origen = "Sheet"
    try:
        csvs = {k: bajar(v) for k, v in PESTANAS.items()}
        for k, texto in csvs.items():
            (DATOS / f"{k}.csv").write_text(texto, encoding="utf-8")
    except Exception as e:  # sin red o planilla privada
        print(f"No pude leer la Sheet ({e}). Uso los CSV de datos/.")
        origen = "CSV locales"
        csvs = {k: (DATOS / f"{k}.csv").read_text(encoding="utf-8") for k in PESTANAS}

    js = ("// Respaldo del catálogo. Lo genera actualizar_respaldo.py: no editar a mano.\n"
          "window.CATALOGO_RESPALDO = " + json.dumps(csvs, ensure_ascii=False, indent=1) + ";\n")
    (AQUI / "datos.js").write_text(js, encoding="utf-8")
    print(f"datos.js actualizado desde {origen}.")


if __name__ == "__main__":
    main()
