# BUENAS PRÁCTICAS — LATO AI

Lo que salió del checklist al pasar de V1 a V2. Todo esto sigue siendo válido y sale del mismo
feedback de Dana, pero **no se chequea sobre el entregable**: son consejos de trabajo, orden de
tareas, manejo de archivos y comunicación. Se leen una vez y se incorporan a la forma de trabajar,
no se marcan documento por documento.

El checklist activo está en [QA_CHECKLIST_LATO.md](QA_CHECKLIST_LATO.md).
La versión completa sin filtrar, en [QA_CHECKLIST_LATO_V1.md](QA_CHECKLIST_LATO_V1.md).

---

## Manejo de archivos y versiones

- Antes de rehacer un documento o un workflow, guardar la versión anterior y **nombrarla**
  (ej. "V45 LATOAI ARCHITECT"). *Shrager, 31 jul*
- Antes de avisar "está listo", confirmar que el archivo guardó: revisar el timestamp de última
  edición. *Hudec, 28 jul*
- El entregable va en Google Docs, en su carpeta y con permisos de edición, el link en Byron's
  tasks, y el tracker actualizado. Al compartir, confirmar en qué tab está. *Allegeant 17 y 23 jul*
- Numeración consecutiva de workflows coordinada con Dana, y el proyecto creado en la plataforma
  con el código numérico correcto. *Avonel 20 jun, Dana 14 jul*
- En proposals combinadas: las versiones por fase separada se guardan como respaldo, y en la
  carpeta de Proposals queda una sola, con el código de los dos números al final. *Kovalev, 21 jul*

## Orden de trabajo

- Workflow primero, proposal después. No se manda a estimates un workflow del que no estamos
  seguros: para eso se agenda una reunión solo de workflow. *Shrager 24 jul, Training Session 15 abr*
- Los happy paths primero: no sobrecomplicar la arquitectura sobre supuestos de una reunión de
  hora y media. *Training Session, 15 abr*
- Máximo 1 a 3 casos por fase. Cuatro solo si el flujo realmente lo exige. *Training Session, 15 abr*
- Usar los últimos prompts compartidos y generar con el modelo Max, no Lite. *Baily 15 jul, Shrager 24 jul*
- En la plataforma: prompts cortos y por fases, ediciones quirúrgicas de a una. No prompts largos.
  *Walnut, 16 jul*
- "Approve architecture" solo después de la revisión de Dana. *Shrager, 24 jul*
- Si aún no hay pricing, dejar el emoji de precio en el título de la proposal y, cuando llegue,
  quitarlo y poner "- Proposal". *Accuro, 3 jul*

## Decisiones de alcance que ya están tomadas

- No construimos calendar tools desde cero: se usa Calendly o Google Calendar y nos conectamos
  por API. *KNOWLEDGE BASE, 4 may*
- Todo caso cuelga de un Centralized Dashboard / AI Nucleus. *Training Session, 15 abr*
- Lo relacionado con fees no va en el workflow: solo se tiene en cuenta para la proposal.
  *Shrager, 24 jul*
- Si el cliente usa la palabra "phase" en su propio proceso, no inventar términos nuevos para los
  nuestros: se usan sub-IDs 3A / 3B / 3C. *EHR Edge, 16 jul*
- Las preguntas clínicas, legales o de asesoría siempre escalan a una persona. *Health Clinic, 18 may*

## Comunicación

- Videos de review: varios cortos o medianos, nunca uno largo. *Health Clinic, 30 jul*
- Todo correo al cliente lo revisa Dan antes de enviarlo. Y ojo con la zona horaria: EST va una
  hora adelante de la nuestra. *Health Clinic, notas de voz 3 jul*
- Revisar support@latoai.com varias veces al día. Cualquier requerimiento se le pasa a Alex, y se
  le confirma al cliente cuando queda resuelto. *Dana, 3 jul*

## Al revisar un prototipo contra la arquitectura

- Comparar campo por campo contra el ejemplo de referencia (Stambrosky).
- Confirmar que existe la interfaz de sincronización de cada integración.
- Que las facturas se puedan cargar, ver y editar: manual entry no es digitar todo.
- Que haya dashboard de reportes.
- Usar la terminología del cliente: subcontractors, no vendors.

*Videos Willoughby, 3 jul*

## Documentación como memoria

- El business logic doc sirve también como memoria interna: dentro de meses volvemos a él para
  entender cómo funciona el negocio del cliente. Escribirlo pensando en eso. *Health Clinic, 16 jul*
- Dividir los documentos largos por fases para que la revisión, nuestra y la del cliente, se haga
  por partes. *Witkowski, 13 jul*
