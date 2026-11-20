#!/usr/bin/env python3
"""Genera la versión interna completa del sitio en /interno.

Las páginas públicas (raíz del repo) son la fuente. Donde hay algo que todavía
no se revela, la página pública lo marca así:

    <!-- revelar:nombre --> ...versión pública... <!-- /revelar -->

y la versión completa vive en interno/_bloques/nombre.html. Este script copia
cada página pública a interno/, cambia esos bloques por la versión completa,
ajusta las rutas de assets, agrega noindex y una franja de aviso.

Uso: python3 herramientas/generar_interno.py   (desde la raíz del repo)
Hay que correrlo después de cualquier cambio en las páginas públicas.
"""
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
INTERNO = RAIZ / "interno"
BLOQUES = INTERNO / "_bloques"

MARCA = re.compile(r"<!-- revelar:([a-z0-9-]+) -->.*?<!-- /revelar -->", re.S)

FRANJA = (
    '<div style="position:sticky;top:0;z-index:9999;background:#ff3b30;color:#fff;'
    'font:600 13px/1.4 system-ui,sans-serif;text-align:center;padding:8px 12px">'
    'Versión interna completa · no compartir · '
    '<a href="https://houseofcosmic.com/" style="color:#fff;text-decoration:underline">ver sitio público</a>'
    "</div>"
)


def generar():
    usados = set()
    paginas = sorted(p for p in RAIZ.glob("*.html"))
    for pagina in paginas:
        html = pagina.read_text(encoding="utf-8")

        def cambiar(m):
            nombre = m.group(1)
            bloque = BLOQUES / f"{nombre}.html"
            if not bloque.exists():
                sys.exit(f"Falta el bloque interno: {bloque}")
            usados.add(nombre)
            return bloque.read_text(encoding="utf-8")

        html = MARCA.sub(cambiar, html)
        # rutas: las páginas internas viven un nivel abajo
        html = re.sub(r'((?:src|href)=")assets/', r"\1../assets/", html)
        html = html.replace(
            '<meta charset="utf-8">',
            '<meta charset="utf-8">\n  <meta name="robots" content="noindex, nofollow">',
            1,
        )
        html = re.sub(r"(<body[^>]*>)", r"\1\n  " + FRANJA, html, count=1)
        (INTERNO / pagina.name).write_text(html, encoding="utf-8")

    sobrantes = {p.stem for p in BLOQUES.glob("*.html")} - usados
    print(f"{len(paginas)} páginas generadas en interno/")
    if sobrantes:
        print("Bloques sin usar (ya revelados o marca borrada):", ", ".join(sorted(sobrantes)))


if __name__ == "__main__":
    generar()
