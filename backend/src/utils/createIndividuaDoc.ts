import { expectedKeys } from './expectedKeys'
import { createDocument } from './createDocument'

const titleMapIndividual = {
  descripcion: 'Descripción del texto o actividad a realizar.',
  'palabras claves': 'Palabras claves.',
  objetivos: 'Objetivos de las lecturas o actividad a realizar.',
  conceptos: 'Conceptos claves y definiciones.',
  resumen: 'Resumen de la(as) lecturas.',
  metodologia: 'Metodología de trabajo (Cómo realizó la actividad).',
  conclusiones: 'Conclusiones de la lectura o actividad.',
  discusiones: 'Discusiones y recomendaciones.',
  bibliografia: 'Bibliografía.',
}

export const createIndividualDoc = (content: any) =>
  createDocument(content, {
    title: 'Protocolo Individual',
    expectedKeys,
    titleMap: titleMapIndividual,
    highlightTitle: true, // 👈 centrado y azul
  })

export default createIndividualDoc

