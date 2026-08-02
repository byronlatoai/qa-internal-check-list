# QA CHECKLIST — LATO AI · V2

Lista de verificación antes de entregar un Workflow, Proposal, Technical Scope Document,
API Research o Business Logic Doc.

**Qué entra aquí.** Solo lo que se puede verificar **mirando el entregable**: abro el documento,
lo reviso y digo sí o no. Todo lo que era consejo de trabajo, orden de tareas o manejo de
archivos salió a [BUENAS_PRACTICAS.md](BUENAS_PRACTICAS.md); sigue siendo válido, pero no es
algo que se chequee sobre el documento.

**V1** está en [QA_CHECKLIST_LATO_V1.md](QA_CHECKLIST_LATO_V1.md), con las 151 reglas sin filtrar
y la trazabilidad completa de dónde salió cada una.

**Cómo se lee.** Los ítems marcados `CRÍTICO` son los que se han devuelto corregidos más de una
vez. El bloque **T** son las reglas transversales: se repiten al principio de los cinco checklists.

**60 reglas únicas** · 22 críticas · máximo 20 por entregable.

---

## TRANSVERSALES (T)
*8 ítems · 4 críticos · aplican a los cinco entregables*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| T.1 | Nombres | CRÍTICO | No aparece ningún nombre de persona, ni del cliente, ni de LATO, ni de terceros. Tampoco nombres de los clientes finales o grupos del cliente. Se escribe "el encargado de X". | Giovanni's 28 jul ("esto lo hemos hablado mil veces"), Green Climate, Allegeant, Health Clinic |
| T.2 | Nombres | CRÍTICO | Los nombres propios están verificados, no copiados de la transcripción: Zelis (no Celis/Zealous), Xplor Pay (no Wordplay), Baily (no Bailey), y los grupos con su nombre completo. | Allegeant 20 jul, Hudec 28 jul, Baily 22 jul |
| T.3 | Verificación | | No hay nada inventado: ni temas que no se hablaron, ni datos sobre terceros sin verificar, ni porcentajes o estadísticas de los que no estemos 100% seguros. | Health Clinic 16 jul ("las estadísticas son peligrosas"), video Avonel 22 jun |
| T.4 | Cliente | CRÍTICO | No se le pide al cliente nada que ya confirmó en la reunión, que ya entregó, o a lo que ya tenemos acceso. | Willoughby 21 jul, Health Clinic 25 jun, video Accuro 3 jul |
| T.5 | Consistencia | CRÍTICO | Lo que cambió está reflejado en todos los documentos y tablas relacionadas: workflow, proposal, tabla de fees, key capabilities, systems & connections y timeline. | River Salvage 14 jul, Shrager, Walnut |
| T.6 | Redacción | | Sin guiones largos (—), sin emojis ni símbolos ①②③, y sin frases repetidas entre secciones. | Health Clinic 25 jun, Allegeant 20 jul, Baily 21 jul |
| T.7 | Redacción | | Sin referencias a grabaciones, transcripts ni reuniones. | Allegeant 23 jul |
| T.8 | Posicionamiento | | El documento está en inglés y en ninguna parte se menciona que nos apoyamos en modelos de IA abiertos. | Green Climate 24 jul, KNOWLEDGE BASE 6 abr |

---

## TABLA 1 — WORKFLOW / ARQUITECTURA
*12 ítems · 5 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 1.1 | Scope | | Los casos del diagrama son exactamente los del Phase 1 acordado: sin casos extra, sin casos de fases futuras y sin procesos que se descartaron. | Pipitone (client onboarding NO va), Walnut (solo voice), Shrager (quitar Caso 3), Hudec |
| 1.2 | Nomenclatura | CRÍTICO | Todo dice "Case", no "Phase". El sistema los genera como Phase y hay que renombrarlos a mano. | EHR Edge 16 jul; ejemplo correcto: Shrager Defense |
| 1.3 | Lógica | CRÍTICO | Cada condicional tiene todas sus salidas dibujadas y etiquetadas, y ningún path queda abierto: todos, incluidos los de salida temprana, llegan al nodo de Data Logging & Reporting. | QA Accuro issues #01 y #03; Hudec 28 jul (el nodo [4A-3] sin yes path) |
| 1.4 | Estructura | | El primer nodo define el intake channel: de dónde entra la data. | QA Accuro, issue #02 |
| 1.5 | APIs | CRÍTICO | Cada API está verificada contra documentación oficial. Lo que no tiene API pública aparece como drag-and-drop o carga manual, dicho explícitamente. | EHR (Cause IQ), Shrager (UJS Portal), Walnut (Quicken), Hudec (Dental Intelligence) |
| 1.6 | APIs | | No aparece ningún sistema fuera de scope, ni sin confirmar por el cliente, ni que no vayamos a usar. Si ya usan Slack, no se les mete SendGrid. | EHR (LinkedIn), Pipitone (ARIBA), Hudec (WorldPay), Willoughby 21 jul, video Avonel 22 jun |
| 1.7 | APIs | | La tabla Systems & Connections coincide con el flujo en ambos sentidos: lo que está en la tabla aparece en el diagrama y al revés. | Hudec 28 jul (Dental Intelligence estaba en la tabla, no en el flujo) |
| 1.8 | Key Capabilities | CRÍTICO | Están completas y actualizadas al scope actual, e incluyen Scalable & Modular Architecture redactado hacia futuros use cases, y Security & Hosting. | Walnut 21 jul, Shrager 24 jul |
| 1.9 | TBD | CRÍTICO | Los TBD son pocos y agrupados. Lo que se puede asumir se asume, y el detalle fino se guarda como pregunta para el cuestionario. | Videos Avonel 22 jun |
| 1.10 | Herencia | | Ningún nodo, nombre o texto quedó heredado de otro proyecto. | Video Avonel 22 jun ("¿por qué Material Test Record Intake? Eso es de otro caso") |
| 1.11 | Redacción | | El follow-up no lo "decide" la IA: se redacta como "the system determines and executes the appropriate follow-up action based on the configured workflow", y el contenido de los mensajes lo aprueba el cliente. | Recomendación de Alex, KNOWLEDGE BASE 8 jun |
| 1.12 | Export | | El PDF exportado revisado nodo por nodo: la numeración corresponde al flujo real, no hay nodos duplicados y ninguna etiqueta se solapa con las líneas. | Walnut 16 jul, Pipitone 30 jul, EHR Edge 16 jul |

---

## TABLA 2 — PROPOSAL
*12 ítems · 5 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 2.1 | Base | | La proposal está construida sobre el workflow aprobado, no sobre la transcript. La transcript solo dio contexto. | Shrager 24 jul ("workflow first, proposal after that"), Baily 15 jul |
| 2.2 | Estructura | | Están todas las secciones del template: Project Overview, Workflow Summary, Please note, API Integrations, Client Confirmation Requirements, Centralized Dashboard, Operational Efficiency Highlights, Scope of Work, Fees y Agreement. | Template LP2XXX |
| 2.3 | Redacción | CRÍTICO | Cero "(API: X)" en el Workflow Summary y en Operational Efficiency Highlights: ahí se habla por canal (via SMS, via email, via voice). Los nombres de API van únicamente en API Integrations. | EHR 22 jul + Baily 21 jul ("siempre me toca borrarlas a mano") |
| 2.4 | Client Confirmation | CRÍTICO | Solo accesos, licencias, credenciales, IDs y walkthroughs que el cliente tenga que dar. Fuera lo que gestiona LATO (Twilio, SendGrid, Webbula) y fuera la configuración interna, que es material del cuestionario. | Video Baily 22 jul (de 8 ítems a 3), video Accuro 3 jul |
| 2.5 | API Integrations | | Solo APIs reales y confirmadas. Lo no viable va como manual o drag-and-drop y no aparece como integración, y lo opcional se describe como opcional en todas las secciones. | EHR (Cause IQ), Shrager (UJS), video Baily 22 jul (Webbula) |
| 2.6 | Dashboard | CRÍTICO | Las Key capabilities son idénticas a las del workflow, no la lista que reescribe el generador. | Walnut 21 jul |
| 2.7 | Terminología | | La terminología es la misma del workflow, y los títulos de casos son consistentes entre sí: todos con número o todos sin número. | Video EHR 22 jul, Shrager 31 jul |
| 2.8 | Redacción | | El nombre del cliente está correcto en todo el documento. | Baily 22 jul, L&L 30 jun |
| 2.9 | Timeline | | Las 5 fases del Scope of Work están, y las semanas por caso suman el total. Si el pricing no lo especifica, se confirma. | Template, Shrager 24 jul |
| 2.10 | Fees | | Una fila de setup fee por caso o fase, y el monthly desglosado en filas numeradas con sus mínimos, en el mismo orden y con exactamente el contenido que mandó leadership. | Baily, EHR, Walnut, video EHR 22 jul |
| 2.11 | Fees | CRÍTICO | Ningún valor de template sin reemplazar ($XX,XXX.00, [X], servicios que no aplican), miles con coma (1,000.00) y notas al pie completas. | Comparación template vs. entregable de Baily |
| 2.12 | Fees | CRÍTICO | Todo lo que cambió en el workflow está reflejado en la tabla de fees. | River Salvage 14 jul ("te quedó faltando arreglar QuickBooks en la tabla de fees") |

---

## TABLA 3 — TECHNICAL SCOPE DOCUMENT
*12 ítems · 4 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 3.1 | Estructura | | Un solo documento, una sola tab, un solo PDF, aunque cubra dos procesos distintos. Se divide en secciones internas, nunca en archivos separados. | Allegeant 17 jul (nota de voz) |
| 3.2 | Estructura | | Cubre el proceso completo acordado, con el contexto de qué se hace en cada parte. | Allegeant 17 jul |
| 3.3 | Contenido | CRÍTICO | Cada afirmación técnica está verificada. ¿De verdad es WordPress? ¿De verdad está en Hostinger? ¿De verdad existe ese sistema de encriptación? | Health Clinic 25 jun, Allegeant 20 jul |
| 3.4 | Contenido | | Todos los portales y roles están documentados, cada uno con sus capturas. Ninguno omitido. | Health Clinic 25 jun |
| 3.5 | Contenido | | Los intervalos de sincronización llevan nota de dependencia de la API del proveedor: no los podemos garantizar. | Health Clinic 25 jun |
| 3.6 | Contenido | | Los pasos que ejecuta una persona se declaran explícitamente: el sistema notifica a la persona encargada, el sistema no envía ese correo. | Allegeant 20 jul |
| 3.7 | Contenido | | Lo que depende de un cheat sheet del cliente se declara como tal, con captura de la hoja, en vez de presentarlo como información cierta. | Allegeant 20 jul |
| 3.8 | Contenido | | Los wizards están completos, pantalla por pantalla, sin saltarse pasos. | Allegeant 20 jul y 23 jul |
| 3.9 | Imágenes | CRÍTICO | Las imágenes son solo imágenes: cero texto o explicaciones dentro. Los devs necesitan el doc en .md y ese texto se pierde. | Allegeant 20 jul |
| 3.10 | Imágenes | CRÍTICO | Una captura por paso, correspondiente al proceso descrito, con las señalizaciones sobre el elemento correcto y los números legibles. | Allegeant 20 jul, puntos 9, 10, 11 y 12 |
| 3.11 | Formato | CRÍTICO | Sin títulos ni textos huérfanos al final de página, las tablas no se parten, y el título de cada figura queda junto a su imagen. | Health Clinic 25 jun, Allegeant 20 jul |
| 3.12 | Formato | | Los headings empiezan en Heading 1, y la fuente, los tamaños y el espaciado son consistentes en todo el documento. | Video Health Clinic 25 jun |

---

## TABLA 4 — API RESEARCH REPORT
*6 ítems · 2 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 4.1 | Método | CRÍTICO | Todo sale de fuentes oficiales y actuales. Nunca del knowledge base propio del modelo. | Prompt oficial, KNOWLEDGE BASE 6 abr |
| 4.2 | Contenido | | Responde las cuatro preguntas: ¿existe API pública? ¿hay sandbox? ¿cómo se obtienen las keys de producción y de sandbox? ¿hay costo o suscripción extra? | Prompt oficial |
| 4.3 | Contenido | | Lleva veredicto explícito: viable, requiere validación con el vendor, o no viable. | Ejemplos Foundation / McCormick / Trimble |
| 4.4 | Contenido | CRÍTICO | Reporta las posibilidades encontradas, sin dar recomendaciones ni asumir el approach. | Green Climate 24 jul |
| 4.5 | Contenido | | Incluye las preguntas concretas para el vendor y sus datos de contacto. | Green Climate, Giovanni's |
| 4.6 | Contenido | | Declara qué parte del scope queda TBD mientras el vendor no responda. | Green Climate, Giovanni's |

---

## TABLA 5 — BUSINESS LOGIC DOC / DESIGNER BRIEF
*10 ítems · 2 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 5.1 | Nivel de detalle | CRÍTICO | No es un technical scope: título, descripción corta y lenguaje simple, sin exagerar ni pedir de más. | Health Clinic, notas de voz 16 jul |
| 5.2 | Audiencia | CRÍTICO | Escrito para quien lo va a leer: a los devs no se les explica lo que ya saben, y sí lo que no saben. | Videos Health Clinic 16 jul |
| 5.3 | Contenido | | Recoge la lógica de negocio que se habló: ventanas horarias, zonas horarias, reglas de escalación, cadencias y toggles de on/off. | Health Clinic 16 jul |
| 5.4 | Contenido | | Cada regla que implique una interfaz describe esa interfaz, con screenshot de referencia cuando exista. | Health Clinic 16 jul |
| 5.5 | Contenido | | Las reglas están al nivel de granularidad correcto: per patient, per medication, no "por paciente" a secas. | Video Health Clinic 16 jul |
| 5.6 | Contenido | | Los canales que no usamos no se mencionan. Si el caso no hace voz, no aparece voz en ninguna parte. | Video Health Clinic 16 jul |
| 5.7 | Estructura | | Organizado por módulos o tabs, con una intro que explique qué módulos trae cada fase. | Witkowski 13 jul |
| 5.8 | Estructura | | Cada módulo lleva sus tres pantallas: lista, detalle y formulario de creación, con sus campos. | Witkowski 13 jul |
| 5.9 | Estructura | | Sin exagerar en campos. Si hay duda, quedan como no obligatorios: la idea es plataformas simples. | Witkowski 13 jul |
| 5.10 | Requerimientos | | Los cambios pedidos a Alex van con screenshot y el punto concreto, no en prosa. | Willoughby 3 jul, River Salvage 14 jul |

---

*60 reglas únicas, de las 151 de V1. Se quedó solo lo verificable sobre el entregable;
lo demás pasó a BUENAS_PRACTICAS.md.*
