# -*- coding: utf-8 -*-
"""
Genera los datos de la aplicación a partir de las dos fuentes editables:

    docs/QA_CHECKLIST_LATO.md   ->  ítems propios de cada documento (tablas 1 a 5)
    data/transversales.json     ->  reglas que aplican a todos los entregables

Salidas:
    data/checklist.json         ->  fuente combinada, legible y versionable
    assets/js/data.js           ->  el mismo contenido como módulo JS (para que la
                                    app funcione también abriéndola con file://)

Uso:   python build/build_data.py
"""

import io, os, re, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD   = os.path.join(ROOT, "docs", "QA_CHECKLIST_LATO.md")
TRJ  = os.path.join(ROOT, "data", "transversales.json")
OUTJ = os.path.join(ROOT, "data", "checklist.json")
OUTS = os.path.join(ROOT, "assets", "js", "data.js")

VERSION = "2.0"
CONTENIDO = "Checklist V2"

DOCUMENTOS = [
    {
        "id": "workflow", "tabla": "1", "corto": "Workflow",
        "titulo": "Workflow / Arquitectura",
        "resumen": "El diagrama en LATO Architect y su PDF exportado.",
        "cuando": "Antes de darle «approve architecture» y antes de que exista cualquier proposal.",
    },
    {
        "id": "proposal", "tabla": "2", "corto": "Proposal",
        "titulo": "Proposal",
        "resumen": "El documento que va al cliente.",
        "cuando": "Después de que el workflow está aprobado. Nunca se construye sobre la transcript.",
    },
    {
        "id": "tech-scope", "tabla": "3", "corto": "Technical Scope",
        "titulo": "Technical Scope Document",
        "resumen": "El documento que leen el cliente y los developers.",
        "cuando": "Antes de mandarlo a revisión. Casi todo el feedback aquí es de detalle: imágenes, capturas y formato.",
    },
    {
        "id": "api-research", "tabla": "4", "corto": "API Research",
        "titulo": "API Research Report",
        "resumen": "El reporte de viabilidad de APIs de un cliente.",
        "cuando": "Antes de pasarlo a Dana o a Mike. Alimenta directamente al workflow y a la proposal.",
    },
    {
        "id": "business-logic", "tabla": "5", "corto": "Business Logic",
        "titulo": "Business Logic Doc / Designer Brief",
        "resumen": "Lo que va a devs y diseñadores.",
        "cuando": "Antes de entregárselo a Alex o al equipo de diseño.",
    },
]


def items_de_tabla(md, tabla):
    out = []
    for line in md.splitlines():
        if not re.match(r"^\|\s*%s\.\d+\s*\|" % tabla, line):
            continue
        celdas = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(celdas) != 5:
            continue
        num, cat, crit, texto, fuente = celdas
        out.append({
            "id": num,
            "categoria": cat,
            "critico": crit == "CRÍTICO",
            "texto": texto,
            "fuente": fuente,
        })
    return out


def bloques_de(items_propios, transversales):
    """Orden fijo: Transversales, Críticos del documento, y el resto por categoría."""
    bloques = [{
        "id": "transversales",
        "titulo": "Transversales",
        "subtitulo": "aplican a todos los entregables",
        "tipo": "transversal",
        "items": transversales,
    }]

    criticos = [i for i in items_propios if i["critico"]]
    if criticos:
        bloques.append({
            "id": "criticos",
            "titulo": "Críticos",
            "subtitulo": "los que se han devuelto corregidos más de una vez",
            "tipo": "critico",
            "items": criticos,
        })

    resto = [i for i in items_propios if not i["critico"]]
    categorias = []
    for i in resto:
        if i["categoria"] not in categorias:
            categorias.append(i["categoria"])
    for cat in categorias:
        bloques.append({
            "id": re.sub(r"[^a-z0-9]+", "-", cat.lower()).strip("-"),
            "titulo": cat,
            "subtitulo": "",
            "tipo": "categoria",
            "items": [i for i in resto if i["categoria"] == cat],
        })
    return bloques


def main():
    md = io.open(MD, encoding="utf-8").read()
    trans_raw = json.load(io.open(TRJ, encoding="utf-8"))["transversales"]

    transversales = [{
        "id": t["id"],
        "categoria": t["categoria"],
        "critico": bool(t["critico"]),
        "texto": t["texto"],
        "fuente": t["fuente"],
        "aplica_a": t.get("aplica_a", "todas"),
    } for t in trans_raw]

    documentos = []
    for d in DOCUMENTOS:
        propios = items_de_tabla(md, d["tabla"])
        aplica = [t for t in transversales
                  if t["aplica_a"] == "todas" or d["id"] in t["aplica_a"]]
        # el campo aplica_a solo sirve para armar, no viaja a la app
        aplica = [{k: v for k, v in t.items() if k != "aplica_a"} for t in aplica]
        bloques = bloques_de(propios, aplica)
        total = sum(len(b["items"]) for b in bloques)
        criticos = sum(1 for b in bloques for i in b["items"] if i["critico"])
        documentos.append(dict(d, bloques=bloques, total=total, criticos=criticos,
                               propios=len(propios), transversales=len(aplica)))

    data = {
        "version": VERSION,
        "contenido": CONTENIDO,
        "unicos": sum(d["propios"] for d in documentos) + len(transversales),
        "documentos": documentos,
    }

    io.open(OUTJ, "w", encoding="utf-8").write(
        json.dumps(data, ensure_ascii=False, indent=2))
    io.open(OUTS, "w", encoding="utf-8").write(
        "// Generado por build/build_data.py — no editar a mano.\n"
        "// Fuentes: docs/QA_CHECKLIST_LATO.md y data/transversales.json\n"
        "window.QA_DATA = " + json.dumps(data, ensure_ascii=False) + ";\n")

    print("data/checklist.json y assets/js/data.js actualizados")
    print("  reglas únicas: %d  (%d propias + %d transversales)"
          % (data["unicos"], sum(d["propios"] for d in documentos), len(transversales)))
    for d in documentos:
        print("  %-16s %3d ítems  (%d críticos, %d bloques)"
              % (d["corto"], d["total"], d["criticos"], len(d["bloques"])))


if __name__ == "__main__":
    main()
