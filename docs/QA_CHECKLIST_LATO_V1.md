# QA CHECKLIST — LATO AI
### Lista de verificación antes de entregar cualquier Workflow, Proposal, Technical Scope Document, API Research o Business Logic Doc

**Fuente:** recopilación del feedback de Dana Carvajal en los chats de Telegram de los 20 proyectos
(abril – julio 2026), sus 16 videos de revisión, sus 41 notas de voz (transcritas), las capturas anotadas
que envió, la KNOWLEDGE BASE, y la comparación entre los documentos generados por el sistema y las
versiones ya corregidas a mano por ella.

**Cómo se usa:** cada ítem se marca antes de mandar el entregable a revisión. Los ítems marcados
🔺 **CRÍTICO** son a los que hay que ponerles más cuidado: son los que se han devuelto corregidos
más de una vez.

**Nota:** las reglas que aplican a todos los entregables (bloque **T — Transversales**) se repiten
dentro de cada pestaña del Excel, como primer bloque. Aquí en el markdown están listadas una sola vez.

**151 ítems** · 44 críticos

---

## TABLA 1 — WORKFLOW / ARQUITECTURA
*36 ítems · 11 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 1.1 | Scope | CRÍTICO | Los casos del diagrama son exactamente los del Phase 1 acordado. Nada de casos extra, ni casos de fases futuras, ni procesos que se descartaron. | Pipitone (client onboarding NO va), Walnut (solo voice, el AP no), Shrager (quitar Caso 3), Hudec |
| 1.2 | Scope | | Máximo 1–3 casos. 4 solo si el flujo realmente lo exige. | Training Session 15 abr |
| 1.3 | Scope | | Todo caso cuelga de un Centralized Dashboard / AI Nucleus (LATO OS). | Training Session 15 abr |
| 1.4 | Scope | | Lo relacionado con fees no se pone en el workflow: solo se tiene en cuenta para la proposal. | Shrager 24 jul |
| 1.5 | Nomenclatura | CRÍTICO | El sistema escribe "Phase 1 / Phase 2". Renombrar manualmente a "Case 1 / Case 2". No debe quedar ni una referencia nuestra a "phase". | EHR Edge 16 jul; ejemplo correcto: Shrager Defense |
| 1.6 | Nomenclatura | | Si el cliente usa "phase" en SU proceso, no inventar términos nuevos (tipo "Lane"). Usar sub-IDs 3A / 3B / 3C: el condicional ya deja claro que son ramas. | EHR Edge 16 jul |
| 1.7 | Estructura | | El primer nodo siempre define el intake channel: de dónde entra la data. | QA Accuro, issue #02 |
| 1.8 | Lógica | CRÍTICO | Cada condicional tiene TODAS sus salidas dibujadas, con flecha y etiqueta. No basta con describirlas en el texto lateral. | QA Accuro issue #01; Hudec 28 jul (el nodo [4A-3] se quedó sin el yes path) |
| 1.9 | Lógica | | Todos los paths, incluidos los de salida temprana (redirects, no-match, transferencias), terminan o convergen en el nodo de logging. | QA Accuro issue #03 |
| 1.10 | Lógica | | La escalation a humano tiene su propio mini árbol de decisión: live transfer (lo pide el caller) vs. ticket / queue routing. | QA Accuro issue #04 |
| 1.11 | Lógica | | Existe el nodo final de Data Logging & Reporting. | Estándar en todos los workflows |
| 1.12 | Lógica | | Sin nodos duplicados, sin exit paths faltantes, sin process nodes mal etiquetados. | Walnut 16 jul; Pipitone 30 jul (6 issues) |
| 1.13 | Lógica | | La forma del nodo corresponde a lo que es: proceso, interfaz/subproceso o decisión. No usar la de interfaz para un proceso normal. | Health Clinic 20 may |
| 1.14 | Lógica | | La numeración de nodos [1], [2A-1]… corresponde al orden real del flujo después de cada cambio. | L&L 30 jun |
| 1.15 | APIs | CRÍTICO | Cada API listada está verificada contra documentación oficial. Si no hay API pública, el paso se cambia a drag-and-drop / carga manual y se dice explícitamente. | EHR (Cause IQ), Shrager (UJS Portal), Walnut (Quicken), Hudec (Dental Intelligence) |
| 1.16 | APIs | | Ningún sistema que el cliente no haya confirmado, ni sistemas arrastrados de conversaciones viejas. | Willoughby 21 jul ("¿de dónde sacaste todos estos softwares?") |
| 1.17 | APIs | | Todo sistema de la tabla Systems & Connections aparece en el flujo, y viceversa. | Hudec 28 jul (Dental Intelligence estaba en la tabla, no en el flujo) |
| 1.18 | APIs | | Los sistemas fuera de scope se eliminan por completo, no se dejan mencionados. | EHR (LinkedIn), Pipitone (ARIBA), Hudec (WorldPay, Dental Intelligence) |
| 1.19 | APIs | CRÍTICO | No ofrecer sistemas que no vamos a usar ni que el cliente necesita. Si ya usan Slack, las notificaciones van por Slack y por la hotlist: no se les mete SendGrid. | Video Avonel 22 jun |
| 1.20 | Key Capabilities | CRÍTICO | Incluye siempre Scalable & Modular Architecture, redactado hacia futuros use cases, no hacia el caso actual. Ej: "Designed as a foundational system that supports future workflows, additional modules, and expanded reporting capabilities." | Walnut 21 jul |
| 1.21 | Key Capabilities | | Incluye Security & Hosting: private models, no public LLMs, data stateside (AWS/Azure), SOC 2 in progress. | Estándar |
| 1.22 | Key Capabilities | | Se actualizan después de cualquier cambio de scope; no se quedan con las de antes. | Shrager 24 jul |
| 1.23 | Redacción | | Sin comparaciones con la versión anterior: nada de "instead of X". El workflow describe el proceso, no los cambios. | L&L 30 jun |
| 1.24 | TBD | CRÍTICO | Los TBD: pocos y agrupados. Un TBD general ("la cadencia y sus tiempos se definen con el cliente") en vez de uno por cada detalle. Demasiados TBD angustian a Alex y al cliente. | Videos Avonel 22 jun |
| 1.25 | TBD | CRÍTICO | Lo obvio se asume, no se marca como TBD. Los detalles finos se guardan como preguntas para el cuestionario, no como TBD en el workflow. | Videos Avonel 22 jun |
| 1.26 | TBD | | Redactar "pendiente de confirmación", no "not yet defined". | Video Avonel 22 jun |
| 1.27 | Redacción | CRÍTICO | Revisar los pasos heredados de otro proyecto: nodos copiados y pegados que quedaron con el nombre del cliente anterior. | Video Avonel 22 jun ("¿por qué Material Test Record Intake? Eso es de otro caso") |
| 1.28 | Redacción | | No atribuir responsabilidades ni "quién hace qué": la IA no identifica bien los roles de una reunión. | Green Climate 24 jul |
| 1.29 | Redacción | CRÍTICO | La IA no "decide" el canal de follow-up. Redactar: "The system determines and executes the appropriate follow-up action based on the configured workflow and the contact information available for the lead." Y el contenido de los mensajes lo define y aprueba el cliente, no lo genera la IA. | Recomendación de Alex, KNOWLEDGE BASE 8 jun |
| 1.30 | Redacción | | Preguntas clínicas, legales o de asesoría: escalation a persona, siempre. | Health Clinic 18 may |
| 1.31 | Redacción | | La lógica de intent detection es igual en todos los casos del mismo workflow: scheduling, conversación normal, escalation. | Health Clinic 18 may |
| 1.32 | Visual | | Textos de etiquetas cortos, para que no se solapen con las líneas del diagrama. | EHR Edge 16 jul |
| 1.33 | Plataforma | | Prompts cortos y por fases, ediciones quirúrgicas de a una. No prompts largos. | Walnut 16 jul |
| 1.34 | Plataforma | CRÍTICO | Verificar el PDF exportado nodo por nodo. No confiar en la vista del canvas. | Walnut 16 jul |
| 1.35 | Plataforma | | Aplicar a mano los ajustes que la plataforma no hace: posición de nodos, nombres, tabla de sistemas. | Hudec 29 jul |
| 1.36 | Entrega | | "Approve architecture" solo después de la revisión de Dana. | Shrager 24 jul |

---

## TABLA 2 — PROPOSAL
*40 ítems · 13 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 2.1 | Orden | CRÍTICO | Workflow primero, proposal después. La proposal se construye sobre el workflow aprobado, no sobre la transcript. | Shrager 24 jul ("¿Tamos claros? Workflow first, proposal after that") |
| 2.2 | Orden | | La transcript se usa solo como contexto; el scope sale del workflow. | Baily 15 jul |
| 2.3 | Orden | | Usar los últimos prompts compartidos y generar con el modelo Max, no Lite. | Baily 15 jul; Shrager 24 jul |
| 2.4 | Orden | | Si aún no hay pricing: dejar el emoji de precio en el título y, al llegar el precio, quitarlo y poner "- Proposal". | Accuro 3 jul |
| 2.5 | Estructura | | Secciones completas: Project Overview · Workflow Summary · Please note · API Integrations · Client Confirmation Requirements · Centralized Dashboard · Operational Efficiency Highlights · Scope of Work · Fees · Agreement. | Template LP2XXX |
| 2.6 | Estructura | | Títulos de casos consistentes: todos con número o todos sin número. | Shrager 31 jul |
| 2.7 | Estructura | | Si el proyecto no tiene workflow diagram, no se titula "Workflow Summary" ni se deja el "Please note" que remite al diagrama. La redacción cambia: no es step-by-step. | LAN 28 jul |
| 2.8 | Estructura | | Fases combinadas en un solo doc: la distinción Fase 1 / Fase 2 se mantiene en lo técnico y cada fase lleva su propio setup fee. | Kovalev 21–22 jul |
| 2.9 | Estructura | | En una proposal combinada: una sola tabla de fees con una fila por fase, sus precios y el total de las dos, volviendo al estilo del template original con celdas mergeadas. No dos tablas separadas. | Video Kovalev 22 jul |
| 2.10 | Estructura | | El Project Overview de una proposal combinada se replantea para explicar las dos fases juntas. El Workflow Summary sí se puede reusar de la Fase 1, con la aclaración de qué es de cada fase. | Nota de voz Kovalev 21 jul |
| 2.11 | Estructura | | Las proposals por fases separadas se guardan como respaldo. En la carpeta de Proposals queda una sola, con el código de los dos números al final. | Nota de voz Kovalev 21 jul |
| 2.12 | Estructura | | Intros cortas por sección: una para Fees en general (development + monthlies) y una para Setup Fees, como la de Monthly Fees. | Kovalev 22 jul |
| 2.13 | Estructura | | Si hay fases en paralelo, ponerlo con nota explícita en el timeline. | Kovalev 22 jul |
| 2.14 | Redacción | CRÍTICO | Cero "(API: X)" en el Workflow Summary y en Operational Efficiency Highlights. Se habla por canal: via SMS, via email, via voice. Los nombres y detalles de API van únicamente en API Integrations. | EHR 22 jul + Baily 21 jul ("siempre me toca borrarlas a mano") |
| 2.15 | Redacción | | Nombre del cliente correcto en TODO el documento: Baily ≠ Bailey; L&L Fabrication Inc. con el punto. | Baily 22 jul; L&L 30 jun |
| 2.16 | Redacción | | El estilo del logo del cliente no se estiliza en la proposal si el workflow no lo tiene estilizado. | Accuro 3 jul |
| 2.17 | Client Confirmation | CRÍTICO | Solo lo que el cliente realmente tiene que dar o confirmar: accesos, licencias, credenciales, IDs, walkthroughs. Lista corta: en Baily pasó de 8 ítems a 3. | Video de revisión de Baily, 22 jul |
| 2.18 | Client Confirmation | CRÍTICO | Fuera todo lo que gestiona LATO: Twilio, SendGrid, Webbula. Eso no se le pide al cliente. | Baily 21 jul |
| 2.19 | Client Confirmation | CRÍTICO | Fuera las reglas de configuración interna (cadencias, fórmulas de scorecard, benchmarks, reglas de calificación, user roles & access): eso es material del cuestionario, no de la proposal. | Video Baily 22 jul; video Accuro 3 jul ("el prompt da 7 y no necesitamos 7, con estas tres tenemos") |
| 2.20 | API Integrations | | Solo APIs reales y confirmadas. Lo no viable se describe como manual / drag-and-drop y no aparece como integración. | EHR (Cause IQ), Shrager (UJS) |
| 2.21 | API Integrations | | Lo dudoso se resalta en amarillo y se pregunta antes de entregar. | Baily, Kovalev, Shrager |
| 2.22 | API Integrations | CRÍTICO | Los servicios opcionales (ej. Webbula) se describen como opcionales en todas las secciones, no como parte permanente del flujo, y no aparecen como "connectivity" ni generan requisito de API para el cliente. | Video Baily 22 jul ("Webbula se muestra mucho y es opcional siempre") |
| 2.23 | API Integrations | | Si el workflow menciona un canal (email, SMS, voz), la API correspondiente tiene que estar tanto en el diagrama como en la proposal. | Walnut 21 jul |
| 2.24 | Dashboard | CRÍTICO | Las Key capabilities son idénticas a las del workflow, no la lista que reescribe el generador. Eso incluye el bullet de Scalable & Modular Architecture. | Walnut 21 jul |
| 2.25 | Terminología | CRÍTICO | La terminología de la proposal es la misma del workflow. Si el workflow usa "lanes", la proposal dice lanes, no cases. | Video EHR 22 jul |
| 2.26 | Scope of Work | | Las 5 fases: Preparation & API Planning · Backend Development · Frontend Development · Testing & Optimization · Deployment & Client Review. | Template |
| 2.27 | Scope of Work | | Las semanas por caso suman el total. Si el pricing no lo especifica, se confirma; no se asume. | Shrager 24 jul |
| 2.28 | Fees | | Una fila de setup fee por caso (o por fase). | Template LP2XXX |
| 2.29 | Fees | | Monthly desglosado en filas numeradas: [1] Hosting/Maintenance/Support · [2] For Calls · [3] For Leads · [4] For Chatbot Sessions, cada una con su mínimo y su tarifa de excedente. | Baily, EHR, Walnut |
| 2.30 | Fees | | Mínimos confirmados por Mike aplicados: 400 calls · 50 leads · 200 chatbot sessions. Calls y follow-up/leads van en líneas separadas. | Walnut 21 jul, Baily 21 jul, EHR 21 jul |
| 2.31 | Fees | CRÍTICO | El orden de las líneas sigue el orden en que leadership mandó el pricing, no el que uno prefiera. | Video EHR 22 jul |
| 2.32 | Fees | CRÍTICO | Lo que incluye cada línea dice exactamente lo que dice el pricing. Si el bundle de leads es "unlimited communication via SMS and email", no se le agrega voice: las llamadas se facturan en su propia línea. | Video EHR 22 jul |
| 2.33 | Fees | | Cada línea lleva dentro de su misma fila los bullets de qué incluye: platform hosting, dashboard, support. | Video EHR 22 jul |
| 2.34 | Fees | | Hosting/Maintenance/Support no se cotiza aparte si no hay precio: se reparte dentro de las líneas existentes. | Walnut 21 jul |
| 2.35 | Fees | CRÍTICO | Formato numérico gringo: 1,000.00, miles con coma. | Baily 21 jul |
| 2.36 | Fees | | Notas al pie completas: Active Lead Definition, qué está incluido en el fee de LATO vs. qué es client-managed, sistemas sin API (no generan fee), activación del método de pago antes de producción, contrato de 12 meses. | Baily, EHR |
| 2.37 | Fees | CRÍTICO | Ningún valor de template sin reemplazar: $XX,XXX.00, [X], o servicios que no aplican al caso (ej. SendGrid). | Comparación template vs. entregable de Baily |
| 2.38 | Fees | | Si se elimina un caso, los sistemas que seguían usándose en otro caso se mueven de fila, no se borran. | Shrager 31 jul (Clover y DocuSign) |
| 2.39 | Fees | CRÍTICO | Todo cambio en el workflow se refleja también en la tabla de fees. | River Salvage 14 jul ("te quedó faltando arreglar QuickBooks en la tabla de fees") |
| 2.40 | Formato | | Ajustar espacios para que las secciones no queden partidas ni con textos cortos colgando al final de página. | Video Baily 22 jul |

---

## TABLA 3 — TECHNICAL SCOPE DOCUMENT
*30 ítems · 10 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 3.1 | Estructura | CRÍTICO | Un solo documento, una sola tab, un solo PDF, aunque cubra dos procesos distintos. Se divide en secciones internas, nunca en documentos separados. | Allegeant 17 jul (nota de voz) |
| 3.2 | Estructura | | Cubre el proceso completo acordado (ej. martes Y viernes), con el contexto de qué se hace cada día. | Allegeant 17 jul |
| 3.3 | Estructura | | La longitud no es problema: es un tech scope, va todo lo importante. | Health Clinic 25 jun |
| 3.4 | Estructura | | Secciones tipo: Purpose & Scope · Application Architecture (auth, data source, sync) · Reference Source · Portal Structure · módulo por módulo · Cross-Module Data Relationships · Data Accuracy & Rebuild Plan · Assumptions & Client Confirmations · Out of Scope. | Health Clinic Ph2 |
| 3.5 | Estructura | | Si cambia la estructura del doc, la intro y el overview se actualizan también. | Health Clinic 25 jun |
| 3.6 | Contenido | CRÍTICO | Cada afirmación técnica verificada. ¿De verdad es WordPress? ¿De verdad está en Hostinger? ¿De verdad existe ese sistema de encriptación? No convertir en hecho un comentario o un chiste del cliente. | Health Clinic 25 jun; Allegeant 20 jul, punto 13 |
| 3.7 | Contenido | | Todos los portales y roles documentados (Admin, Sales Rep, Partners), ninguno omitido, cada uno con sus capturas. | Health Clinic 25 jun |
| 3.8 | Contenido | | Conceptos parecidos bien diferenciados: SSO vs. individual login. | Health Clinic 25 jun |
| 3.9 | Contenido | CRÍTICO | Los intervalos de sincronización llevan nota de dependencia de la API del proveedor: no podemos garantizarlos. | Health Clinic 25 jun |
| 3.10 | Contenido | | Incluir un módulo de estado de sincronización visible para el cliente: última actualización, errores, reintentos. Referencia: Stambrosky. | Health Clinic 25 jun |
| 3.11 | Contenido | CRÍTICO | Los pasos que ejecuta una persona se declaran explícitamente: el sistema notifica a la persona encargada; el sistema no envía ese correo. | Allegeant 20 jul, punto 6 |
| 3.12 | Contenido | | Las reglas que dependen de un cheat sheet del cliente se declaran como tal, con captura de la hoja. Nada de tablas presentadas como información cierta: mejor bulletpoints de ejemplo. | Allegeant 20 jul, punto 8 |
| 3.13 | Contenido | | Los wizards se documentan completos, pantalla por pantalla, sin saltarse pasos. | Allegeant 20 jul punto 12 y 23 jul |
| 3.14 | Contenido | | Las referencias cruzadas ("see 3") existen de verdad. | Allegeant 20 jul, punto 13 |
| 3.15 | Contenido | | Cada sección al nivel de detalle correcto: si algo queda corto (ej. el assembly del package), se amplía con más capturas. | Allegeant 20 jul, punto 7 |
| 3.16 | Contenido | | No afirmar cosas técnicamente falsas por simplificar. Si hay una alternativa, va como nota, no como afirmación. | Video Health Clinic 16 jul (los leads sí se podrían leer desde Practice Better: de ahí vienen los correos) |
| 3.17 | Imágenes | CRÍTICO | Las imágenes son solo imágenes: cero texto o explicaciones dentro de la imagen. Los devs necesitan el doc en .md y ese texto se pierde. Toda explicación va en el cuerpo del paso; si la imagen ya trae texto, se rehace. | Allegeant 20 jul, punto 3 |
| 3.18 | Imágenes | | Cada figura numerada, con título, ubicada en el paso que ilustra. | Allegeant |
| 3.19 | Imágenes | | Una captura por paso. No combinar varios pasos en una sola imagen. | Allegeant 23 jul |
| 3.20 | Imágenes | CRÍTICO | Las señalizaciones (flechas, círculos, números) apuntan al elemento correcto. | Allegeant 20 jul, punto 9 |
| 3.21 | Imágenes | | La captura corresponde al proceso descrito en ese paso. | Allegeant 20 jul, punto 10 |
| 3.22 | Imágenes | CRÍTICO | Legibilidad: los números y campos se leen. Si la fuente (grabación del notetaker) tiene mala calidad, se vuelve a capturar. | Allegeant 20 jul, punto 11 |
| 3.23 | Imágenes | | Si faltan pantallas del proceso, se vuelven a capturar: en el check wizard había más interfaces. | Allegeant 20 jul, punto 12 |
| 3.24 | Formato | CRÍTICO | Título y texto de la figura quedan juntos. Usar page break cuando la imagen los separa. | Allegeant 20 jul, punto 5 |
| 3.25 | Formato | CRÍTICO | Sin títulos ni textos huérfanos al final de página. | Health Clinic 25 jun |
| 3.26 | Formato | | Las tablas no se parten entre páginas. | Health Clinic 25 jun |
| 3.27 | Formato | | Estilo de encabezados de tabla consistente: todas con azul o todas sin color, no mezclado. | Health Clinic 25 jun |
| 3.28 | Formato | | Fuente y tamaño consistentes en todo el documento. | Health Clinic 25 jun |
| 3.29 | Formato | CRÍTICO | Los niveles de heading empiezan en Heading 1, no en Heading 2, y de ahí se usa la extensión de numeración. El modelo suele arrancar en H2 y descuadra toda la jerarquía. | Video Health Clinic 25 jun |
| 3.30 | Formato | | Espaciado parejo entre secciones: ni bloques pegados ni huecos gigantes entre headings. | Video Health Clinic 25 jun |

---

## TABLA 4 — API RESEARCH REPORT
*8 ítems · 2 críticos*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 4.1 | Método | CRÍTICO | Solo fuentes oficiales y actuales. Nunca el knowledge base propio del modelo. | Prompt oficial, KNOWLEDGE BASE 6 abr |
| 4.2 | Contenido | | Responder siempre las cuatro preguntas: ¿existe API pública? ¿hay sandbox? ¿cómo se obtienen las keys de producción y de sandbox, requiere partner o aprobación? ¿hay costo o suscripción extra? | Prompt oficial |
| 4.3 | Contenido | | Veredicto explícito: viable · requiere validación con el vendor · no viable. | Ejemplos Foundation / McCormick / Trimble |
| 4.4 | Contenido | CRÍTICO | Reportar las posibilidades encontradas, no dar recomendaciones ni asumir el approach. Si falta info, se reporta "se necesita contactar al vendor" y ya. | Green Climate 24 jul |
| 4.5 | Contenido | | Incluir las preguntas concretas para el vendor y sus datos de contacto. | Green Climate, Giovanni's |
| 4.6 | Contenido | | Declarar qué parte del scope queda TBD mientras el vendor no responda. | Green Climate, Giovanni's |
| 4.7 | Contenido | | Si la API no existe: definir la alternativa (drag & drop, CSV, middleware) y actualizar workflow y proposal. | EHR (Cause IQ), Shrager (UJS) |
| 4.8 | Proceso | | Primero email con preguntas puntuales al vendor. Reunión solo si ellos la piden o no responden por escrito. | KNOWLEDGE BASE 23 abr |

---

## TABLA 5 — BUSINESS LOGIC DOC / DESIGNER BRIEF
*15 ítems · 2 críticos*

*(Los documentos que van a devs y diseñadores: Platform Business Logic, anexos de arquitectura, designer briefs.)*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| 5.1 | Nivel de detalle | CRÍTICO | No es un technical scope. Es una lista de cositas a tener en cuenta: título, descripción corta, lenguaje muy simple, sin exagerar ni pedir de más. Formato tipo Buffalo Valley, no tipo Witkowski. | Health Clinic, notas de voz 16 jul |
| 5.2 | Contenido | | Recoge la lógica de negocio que se habló en la reunión y que la plataforma debe cumplir: ventanas horarias de notificación, zonas horarias por estado, reglas de escalación, cadencias por paciente o cliente, toggles de on/off. | Health Clinic 16 jul |
| 5.3 | Contenido | | Cada regla que implique una interfaz describe esa interfaz (ej. la bandeja de escalaciones con su campo de respuesta y su botón de enviar al provider), con screenshot de referencia cuando exista. | Health Clinic 16 jul |
| 5.4 | Contenido | | Screenshots solo donde apliquen. Lo que se habló y no tiene pantalla va solo en texto. | Health Clinic 16 jul |
| 5.5 | Audiencia | CRÍTICO | Escribir para quien lo va a leer. Si es para devs, no explicarles lo que ya saben (que la IA habla en lenguaje natural, cómo funciona un CRM board); sí explicarles lo que no saben (que el costo es por paciente, que todo queda logueado). | Videos Health Clinic 16 jul |
| 5.6 | Estructura | | En briefs de plataforma se organiza por módulos o tabs, con una intro que explique qué módulos trae cada fase. | Witkowski 13 jul |
| 5.7 | Estructura | | Cada módulo lleva sus tres pantallas: lista, detalle y formulario de creación, con sus campos. | Witkowski 13 jul |
| 5.8 | Estructura | | No exagerar en campos. Si hay duda, dejarlos como no obligatorios. La idea es plataformas simples para el cliente. | Witkowski 13 jul |
| 5.9 | Estructura | | Dividir por fases para que la revisión (interna y con el cliente) sea por partes y no una sola tanda enorme. | Witkowski 13 jul |
| 5.10 | Uso | | Sirve también como memoria interna: dentro de meses volvemos a él para entender cómo funciona el negocio del cliente. Escribirlo pensando en eso. | Health Clinic 16 jul |
| 5.11 | Precisión | | Las reglas se declaran al nivel de granularidad correcto: per patient, per medication, no "por paciente" a secas, cuando una misma factura trae varios medicamentos con periodos distintos. | Video Health Clinic 16 jul |
| 5.12 | Precisión | | Los canales que NO usamos no se mencionan. Si el caso no hace voz, no aparece voz en ninguna parte. | Video Health Clinic 16 jul |
| 5.13 | Precisión | | No inventar aprobaciones ni confirmaciones con terceros que no tienen que ver con ese punto. | Video Health Clinic 16 jul |
| 5.14 | Requerimientos | | Los cambios pedidos a Alex van con screenshot y el requerimiento concreto (estilo Martik / Buffalo Valley), no en prosa. Si no se les dice exactamente dónde está el cambio, no lo encuentran. | Willoughby 3 jul; River Salvage 14 jul |
| 5.15 | Prototipos | | Al revisar un prototipo contra la arquitectura: comparar campo por campo contra el ejemplo de referencia (Stambrosky), confirmar que existe la interfaz de sincronización de cada integración, que las facturas se pueden cargar, ver y editar (manual entry no es digitar todo), y que hay dashboard de reportes. Usar la terminología del cliente: subcontractors, no vendors. | Videos Willoughby 3 jul |

---

## TRANSVERSALES (T)
*22 ítems · 6 críticos*

*(Estas reglas aplican a todos los entregables. Viven en `transversales.json` y se inyectan como primer bloque dentro de cada pestaña del Excel.)*

| # | Categoría | Crítico | Qué revisar | Por qué / de dónde sale |
|---|---|---|---|---|
| T.1 | Nombres | CRÍTICO | Cero nombres de personas, en cualquier documento: ni del cliente, ni de LATO, ni de terceros. Y cero nombres de los clientes finales o grupos del cliente. Escribir "el encargado de X". | Giovanni's 28 jul ("esto lo hemos hablado mil veces"), Green Climate, Allegeant, Health Clinic |
| T.2 | Nombres | CRÍTICO | Nombres propios verificados, nunca copiados tal cual de la transcripción: Zelis (no Celis/Zealous), Xplor Pay (no Wordplay), Baily (no Bailey), y los grupos con su nombre completo (no apodos tipo "Gully"). | Allegeant 20 jul, Hudec 28 jul, Baily 22 jul |
| T.3 | Redacción | | Sin guiones largos (—) en la redacción. Solo en palabras compuestas. | Health Clinic 25 jun |
| T.4 | Redacción | | Sin emojis ni símbolos ①②③ dentro de párrafos: listas numeradas 1) 2) 3). | Allegeant 20 jul, punto 4 |
| T.5 | Redacción | | Sin referencias a grabaciones, transcripts ni reuniones. | Allegeant 23 jul |
| T.6 | Redacción | | Sin repeticiones: ni frases duplicadas entre secciones (el generador repite "Please note: Please note:"), ni información ya dada repetida en cada paso. | Baily 21 jul; video Health Clinic 16 jul |
| T.7 | Verificación | CRÍTICO | Lo que genera el modelo se revisa punto por punto: inventa ítems, mete temas que no se hablaron (ej. HIPAA) y afirma datos sobre terceros que no son ciertos (límites de plan, capacidades de un sistema). Solo queda lo verificado y lo que salió de la reunión. | Health Clinic 16 jul; video Avonel 22 jun |
| T.8 | Verificación | CRÍTICO | Nada de porcentajes ni estadísticas salvo que estemos 100% seguros de que se dijeron en la reunión. "Las estadísticas son peligrosas." | Video Health Clinic 16 jul |
| T.9 | Cliente | CRÍTICO | Nunca pedirle al cliente algo que ya confirmó en la reunión, que ya nos entregó, o a lo que ya tenemos acceso. Antes de mandar un cuestionario, cruzarlo contra la transcript. | Willoughby 21 jul; Health Clinic 25 jun; video Accuro 3 jul |
| T.10 | Consistencia | CRÍTICO | Todo cambio se propaga en cadena: workflow → proposal → tabla de fees → key capabilities → tabla de systems & connections → timeline. | River Salvage, Shrager, Walnut |
| T.11 | Archivo | | Antes de avisar "está listo", confirmar que el archivo guardó: revisar el timestamp de última edición. | Hudec 28 jul |
| T.12 | Archivo | | Guardar y nombrar la versión anterior (ej. "V45 LATOAI ARCHITECT") antes de rehacer un documento o un workflow. | Shrager 31 jul |
| T.13 | Entrega | | Entregable en Google Docs, en la carpeta correcta y con permisos de edición, link en Byron's tasks, tracker actualizado. Al compartir, confirmar en qué tab está. | Shrager 24 jul; Allegeant 17 y 23 jul; Avonel 22 jun |
| T.14 | Entrega | | Numeración consecutiva de workflows coordinada con Dana, y proyecto creado en la plataforma con el código numérico correcto. | Avonel 20 jun; Dana 14 jul |
| T.15 | Idioma | | Todo lo que puede leer leadership va en inglés: reportes, API research, mensajes. | Green Climate 24 jul |
| T.16 | Comunicación | | Videos de review: varios cortos o medianos, nunca uno largo. | Health Clinic 30 jul |
| T.17 | Comunicación | | Todo correo al cliente se lo revisa Dan antes de enviarlo. Y ojo con la zona horaria: EST va una hora adelante de la nuestra. | Health Clinic, notas de voz 3 jul |
| T.18 | Posicionamiento | | Nunca se admite ante el cliente que los workflows se apoyan en modelos de IA abiertos. | KNOWLEDGE BASE 6 abr |
| T.19 | Alcance | | No construimos calendar tools desde cero: se usa Calendly o Google Calendar y nos conectamos por API. | KNOWLEDGE BASE 4 may |
| T.20 | Alcance | | Los happy paths primero: no sobrecomplicar la arquitectura sobre supuestos de una reunión de hora y media. | Training Session 15 abr |
| T.21 | Proceso | | Si el workflow no está 100% claro, se agenda reunión solo de workflow antes de mandarlo a estimates. No vale la pena pedir pricing de un sistema que quizás no es. | Training Session 15 abr |
| T.22 | Proceso | | Revisar support@latoai.com varias veces al día; cualquier requerimiento de cliente se le pasa a Alex, y se le confirma al cliente cuando queda resuelto. | Dana 3 jul |

---

## PASADA RÁPIDA — LOS 12 QUE MÁS SE DEVUELVEN

Si solo hay tiempo para una revisión, que sea esta.

| Ref | Punto |
|---|---|
| 2.14 | "(API: X)" dentro del Workflow Summary de la proposal. |
| 2.24 | Key capabilities distintas entre workflow y proposal. |
| 1.20 | Falta el bullet de Scalable & Modular Architecture, o apunta al caso actual en vez de a futuros use cases. |
| T.1 | Nombres de personas en cualquier documento. |
| 1.8 | Condicionales sin todas sus flechas en el diagrama. |
| 1.15 | APIs sin verificar, o sistemas sin API presentados como integración. |
| T.2 | Nombres propios copiados mal de la transcript. |
| 1.5 | "Phase" en vez de "Case" en el workflow generado. |
| 2.17 | Client Confirmation Requirements inflado con cosas que gestiona LATO. |
| 3.17 | Texto dentro de las imágenes del technical scope. |
| 2.37 | Valores del template sin reemplazar y miles sin coma. |
| 1.24 | Demasiados TBD, y TBD sobre cosas que se podían asumir. |

---

*151 ítems, sin duplicados entre tablas. Construido a partir de los 20 chats de proyecto exportados de Telegram, los 16 videos de revisión de Dana, sus 41 notas de voz (transcritas localmente), las capturas anotadas que envió, la Knowledge Base del equipo, y la comparación entre la proposal generada por el sistema para Baily y la versión que ella corrigió a mano.*
