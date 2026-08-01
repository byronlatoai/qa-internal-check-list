# QA Checklist — LATO AI

Checklist de control de calidad para los entregables de LATO AI: **workflows, proposals,
technical scope documents, API research y business logic docs**.

Es un sitio estático: se abre, se marca lo revisado y se comparte el resultado por link.
No hay servidor, no hay base de datos y no hay build del frontend.

**Contenido:** Checklist V1 — 151 reglas únicas, 44 críticas.

---

## Qué hace

- **Portada** con los cinco tipos de QA. Cada tarjeta muestra cuántos ítems trae, cuántos son
  críticos y por dónde vas si ya empezaste.
- **Checklist por documento**, autocontenido. El orden dentro de cada uno es siempre el mismo:
  1. **Transversales** — las reglas que aplican a todos los entregables
  2. **Críticos** — los de ese documento, los que se han devuelto corregidos más de una vez
  3. **El resto**, agrupado por mini-categoría (Scope, Lógica, APIs, Fees, Imágenes, Formato…)
- **Ficha de la revisión**: cliente, proyecto, revisor y fecha.
- **Notas por ítem**, para dejar qué encontraste o qué corregiste.
- **Filtros**: solo críticos, solo pendientes.
- **Se guarda solo** en el navegador mientras trabajas.
- **Link del resultado**: una URL que lleva la revisión completa adentro. Se la mandas a quien
  la tenga que revisar y la abre tal cual quedó.
- **Exportar** a CSV (se abre en Excel) o JSON, e imprimir a PDF.
- **Plantilla en Excel** en blanco, con una pestaña por documento.

---

## Cómo se usa

Abre `index.html`. Funciona igual con `file://` que publicado, así que puedes probarlo con doble
clic antes de subirlo.

### Publicar en GitHub Pages

1. Sube el repo a GitHub.
2. **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Queda en `https://<usuario>.github.io/<repo>/`.

No hay paso de build: lo que está en el repo es lo que se sirve.

---

## Estructura

```
.
├── index.html                  Portada: elegir el tipo de QA
├── checklist.html              Vista de un checklist
├── assets/
│   ├── css/styles.css          Estilos, claro y oscuro, y hoja de impresión
│   └── js/
│       ├── data.js             GENERADO — los datos del checklist
│       ├── state.js            Guardado local y empaquetado del link
│       ├── export.js           Exportar a CSV y JSON
│       └── checklist.js        Render, marcado, notas y filtros
├── data/
│   ├── transversales.json      FUENTE — reglas que aplican a todos los entregables
│   └── checklist.json          GENERADO — fuente combinada, legible y versionable
├── build/
│   ├── build_data.py           md + json  →  checklist.json y data.js
│   └── build_xlsx.py           checklist.json  →  la plantilla en Excel
├── downloads/
│   └── QA_Checklist_LATO.xlsx  GENERADO — plantilla en blanco
└── docs/
    └── QA_CHECKLIST_LATO.md    FUENTE — las reglas propias de cada documento
```

---

## Cómo se editan las reglas

Hay dos fuentes y todo lo demás se regenera.

| Qué quieres cambiar | Dónde | Después corre |
|---|---|---|
| Una regla de un documento concreto | `docs/QA_CHECKLIST_LATO.md`, en la tabla que toque | ambos scripts |
| Una regla que aplica a todos | `data/transversales.json` | ambos scripts |

```bash
python build/build_data.py     # regenera data/checklist.json y assets/js/data.js
python build/build_xlsx.py     # regenera downloads/QA_Checklist_LATO.xlsx
```

Requiere Python 3 y `openpyxl` (`pip install openpyxl`). Solo hace falta para regenerar; la
aplicación en sí no necesita nada instalado.

### Formato de una regla en el markdown

```
| 2.35 | Fees | CRÍTICO | Formato numérico gringo: 1,000.00, miles con coma. | Baily 21 jul |
```

Las columnas son: número, categoría, `CRÍTICO` o vacío, qué revisar, y de dónde salió la regla.
La categoría es la que agrupa los bloques al final de cada checklist.

### Transversales

Las 22 reglas transversales se escriben una sola vez en `data/transversales.json` y se inyectan
como primer bloque en los cinco checklists y en las cinco pestañas del Excel. Cada una tiene un
campo `aplica_a`:

```json
{ "id": "T.22", "aplica_a": "todas" }
{ "id": "T.22", "aplica_a": ["workflow", "proposal"] }
```

Con `"todas"` sale en todos los checklists. Con una lista, solo en los que nombres.

---

## Cómo funciona el guardado sin base de datos

Dos mecanismos, ninguno necesita servidor:

**Mientras trabajas** — cada marca, nota y campo de la ficha se escribe en `localStorage`, bajo la
clave `lato-qa:v1:<documento>`. Es por navegador y por equipo: si abres el checklist en otro
computador, empieza en blanco.

**Para compartir** — el botón *Copiar link del resultado* serializa la revisión, la comprime con
`CompressionStream('deflate-raw')` y la mete en el fragmento de la URL (`#r=…`). El fragmento no
viaja al servidor, así que el resultado va literalmente dentro del link. Quien lo abre ve la
revisión con su ficha, lo marcado y las notas, y puede seguir editándola en su propio navegador
sin tocar el link original.

Un par de cosas a tener en cuenta:

- El link crece con las notas. Una revisión normal queda en unos cientos de caracteres; una con
  notas largas en todos los ítems puede llegar a varios miles. Los navegadores lo aguantan, pero
  algunos chats cortan URLs muy largas: si eso pasa, manda el CSV o el JSON.
- Como no hay servidor, **no hay historial**. Cada link es una foto del momento en que lo copiaste.

---

## Origen del contenido

Las reglas salieron de revisar el material de trabajo real del equipo entre abril y julio de 2026:
los 20 chats de proyecto exportados de Telegram, los 16 videos de revisión de Dana, sus 41 notas
de voz (transcritas localmente con Whisper), las capturas anotadas que envió, la Knowledge Base
del equipo, y la comparación entre la proposal que generó el sistema para Baily y la versión que
ella corrigió a mano. Ese material de origen no se versiona en este repo.

Cada ítem del checklist conserva de dónde salió, en la columna *Por qué / de dónde sale*.

---

## Roadmap

- Marcar un transversal en un documento y que quede marcado en los demás de la misma revisión.
- Exportar el resultado directamente a `.xlsx` en vez de CSV.
- Una vista de resumen que junte varias revisiones de un mismo cliente.
