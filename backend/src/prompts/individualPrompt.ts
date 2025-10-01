export const indivudualPrompt = (temas: string) => `
Genera un protocolo individual de revisión sistemática sobre el o los temas: "${temas}".

Tu respuesta debe ser ÚNICAMENTE un objeto JSON VÁLIDO, sin explicaciones ni comentarios, sin bloques de código ni formato Markdown.
EVITA darme el json con los delimitadores que establecen un bloque formato json en Markdown
El JSON debe tener exactamente estas claves, los valores de las claves no deben ser arrays ni objetos, deben ser estrictamente Strings:

- descripcion
- palabras claves
- objetivos
- conceptos
- resumen  
- metodologia
- conclusiones
- discusiones
- bibliografia

Indicaciones para cada parte:

- descripcion: en pocas palabras (no mas de 40 palabras) donde digas que actividad se va a realizar, basandote en los temas tambien. quiero que lo escribas en primera persona pero no digas "voy a realizar", describe protocolo individual sobre tales temas etc

- palabras claves: si son varios temas no quiero varias palabras clave por tema, lo que quiero es que me des 5 palabras clave que tengan que ver con todos los temas planteados, UNICAMENTE 5:

por ejemplo, si te doy 3 temas, NO debes darme lo siguiente
  tema 1:
    palabra clave
    palabra clave
    palabra clave
    palabra clave
    palabra clave

  tema 2:
    palabra clave
    palabra clave
    palabra clave
    palabra clave
    palabra clave

  tema 3:
    palabra clave
    palabra clave
    palabra clave
    palabra clave
    palabra clave

Lo que si puedes hacer es usar un formato, separado por comas
ejemplo: 
    palabra, palabra, palabra, palabra...

- objetivos: dame el objetivo genera y especifico, para el trabajo el objetivo general debe tener al menos 30 palabras lista los objetivos especificos con giones - y pon los titulos de objeto especifico y general entre asteriscos, ejemplo:

  **Objetivo General**: ...contenido

  **Objetivos Especificos**
  - ...item
  - ...item
  - ...item

- conceptos: redactame un apartado de conceptos claves relacionados con los temas los conceptos clave y sus definicones no deben estar divididos por tema, si no que deben ser de todos en general y deben ser solo algunos cada concepto debe tener minimo 40 palabras y el numero de conceptos es maximo 7 y no debes enumearlos, en cambio sus subtitulos los debes poner entre asteriscos:

ejemplo:
  **concepto 1**: definicion, pero puedes usar asteriscos para representar partes en cursiva así *ejemplo*

  **concepto 2**: ... 

  **concepto 2**: ... 
  
- resumen: redacta un texto donde hables de el tema o temas. quiero que sean parrafos, donde definas ampliamente cada cosa y hables con soltura el tema o los temas son tambien quiero que te bases en los anteriores objetivos para la redaccion. No mas de 3 parrafos

- metodologia: la metodologia que utilizé para realizar el trabajo. no quiero que digas que use la metodologia de investigacion bibliografica y luego aplicar los conocimientos. se variado debe ser todo un parrafo. evita el uso de las palabras 'exhaustivo' y 'Finalmente' en tu respuesta. quiero que redactes un parrafo donde hables en primera persona y digas que utilizé una metodologia para realizar el protocolo individual sobre el o los temas no quiero que hagas ningun tipo de comentario por tu parte, solamente quiero que me des lo que te pido

- conclusiones: conclusiones de la actividad, listadas por guiones medios -

- discusiones y recomendaciones: di, ninguna

- bibliografia: quiero que me generes una bibliografia citada en apa, debe ser de maximo 5-6 referencias no quiero que hagas ningun tipo de comentario por tu parte, solamente quiero que me des lo que te pido. cada referencia no debe tener ningun tipo de comentario por tu parte NO debes poner ninguna clase de titulo, solo las referencias y mas nada tampoco quiero notas de advertencia, porfavor. las listas deben ser con - no pongas links

Ejemplo de salida esperado:

{
  "descripcion": "...",
  "palabras claves": "...",
  "objetivos": "...",
  "conceptos": "...",
  "resumen": "...",
  "metodologia": "...",
  "conclusiones",
  "discusiones": "ninguna.",
  "bibliografia": "..."
}

No me des el JSON en un bloque MARKDOWN, repito NO me des un bloque Markdown
`
