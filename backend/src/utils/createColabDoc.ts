import { colabExpectedKeys } from './expectedKeys'
import { createTableRow, createDocument } from './createDocument'

const titleMapColab = {
  descripcion: 'Descripción del texto o actividad a realizar.',
  'palabras claves': 'Palabras claves.',
  objetivos: 'Objetivos de las lecturas o actividad a realizar.',
  conceptos: 'Conceptos claves y definiciones.',
  resumen: 'Resumen de las discusiones grupales.',
  'encuentros conceptuales': 'Encuentros conceptuales',
  'desencuentros conceptuales': 'Desencuentros conceptuales',
  metodologia: 'Metodología de trabajo (Cómo realizó la actividad colaborativa).',
  conclusiones: 'Conclusiones de la lectura o actividad.',
  discusiones: 'Discusiones y recomendaciones.',
  bibliografia: 'Bibliografía.',
}

export const createColabDoc = (content: any) =>
  createDocument(content, {
    title: 'Protocolo Colaborativo',
    expectedKeys: colabExpectedKeys,
    titleMap: titleMapColab,
    extraRows: [createTableRow('Registro de participantes', null, false)],
    highlightTitle: false, // 👈 título normal (negro, alineado a la izquierda)
  })

export default createColabDoc

