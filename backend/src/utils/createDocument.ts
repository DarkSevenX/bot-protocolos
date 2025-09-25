import {
  Document,
  Packer,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  AlignmentType,
  Header,
  Footer,
  PageOrientation,
} from 'docx'
import { expectedKeys } from './expectedKeys'

// Tipo para los elementos docx (importar desde markdownToDocx si está en TypeScript)
type DocxElement = Paragraph | Table

// Tipo para el objeto de entrada con firma de índice
interface ProtocoloDocx {
  pregunta: DocxElement[]
  objetivos: DocxElement[]
  criterios: DocxElement[]
  busqueda: DocxElement[]
  analisis: DocxElement[]
  conclusiones: DocxElement[]
  [key: string]: DocxElement[] // Firma de índice para acceso dinámico
}

// Configuración centralizada de estilos
const STYLES = {
  fonts: {
    default: 'Arial',
  },
  sizes: {
    title: 28, // 14 puntos
    text: 24, // 12 puntos
  },
  colors: {
    title: '002060', // Azul para el título principal
    text: '000000', // Negro para el resto
  },
  spacing: {
    line: 300, // Interlineado de 1.5
    after: 20, // Espaciado después
    before: 50, // Espaciado antes
  },
  margins: {
    cell: { top: 10, bottom: 10, left: 80, right: 80 },
    page: { top: 1250, bottom: 1250, left: 1500, right: 1500 },
  },
  table: {
    width: 9000, // Ancho de la tabla en DXA
    columnWidths: [9000],
  },
  page: {
    width: 12240, // 8.5 pulgadas en Twips
    height: 15840, // 11 pulgadas en Twips
  },
}

// Función auxiliar para crear un párrafo
const createParagraph = (text: string, isMainTitle = false) =>
  new Paragraph({
    children: [
      new TextRun({
        text,
        font: STYLES.fonts.default,
        size: isMainTitle ? STYLES.sizes.title : STYLES.sizes.text,
        bold: isMainTitle,
        color: isMainTitle ? STYLES.colors.title : STYLES.colors.text,
      }),
    ],
    alignment: isMainTitle ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: STYLES.spacing,
  })

// Función auxiliar para crear una celda de tabla
const createTableCell = (
  title: string,
  content: DocxElement[] | null,
  isMainTitle = false,
) =>
  new TableCell({
    children: [
      createParagraph(title, isMainTitle), // Título (mainTitle para "Protocolo Individual")
      ...(content ? content : []), // Contenido solo si existe
    ],
    margins: STYLES.margins.cell,
  })

// Función auxiliar para crear una fila de tabla
const createTableRow = (
  title: string,
  content: DocxElement[] | null,
  isMainTitle = false,
) =>
  new TableRow({
    children: [createTableCell(title, content, isMainTitle)],
  })

const createDocument = async (content: ProtocoloDocx) => {
  // Validar entrada
  if (!content || typeof content !== 'object') {
    throw new Error('Content must be a valid object')
  }

  const missingKeys = expectedKeys.filter((key) => !(key in content))
  if (missingKeys.length > 0) {
    throw new Error(`Missing required keys: ${missingKeys.join(', ')}`)
  }

  // Mapear claves a títulos amigables
  const titleMap: { [key: string]: string } = {
  'descripcion': 'Descripción del texto o actividad a realizar.',
  'palabras claves': 'Palabras claves.',
  'objetivos': 'Objetivos de las lecturas o actividad a realizar.',
  'conceptos': 'Conceptos claves y definiciones.',
  'resumen': 'Resumen de la(as) lecturas.',
  'metodologia': 'Metodología de trabajo (Cómo realizó la actividad).',
  'conclusiones': 'Conclusiones de la lectura o actividad.',
  'discusiones': 'Discusiones y recomendaciones.',
  'bibliografia': 'Bibliografía. '
  }

  // Crear filas de la tabla
  const rows = [
    createTableRow('Protocolo Individual', null, true), // Primera fila: solo título, sin contenido
    ...expectedKeys.map((key) =>
      createTableRow(titleMap[key] as any, content[key] as any, false),
    ), // Resto de filas con títulos normales
  ]

  // Crear tabla
  const table = new Table({
    alignment: AlignmentType.CENTER,
    rows,
    width: { size: STYLES.table.width, type: 'dxa' },
    columnWidths: STYLES.table.columnWidths,
  })

  // Crear documento
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: STYLES.page.width,
              height: STYLES.page.height,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: STYLES.margins.page,
          },
        },
        headers: {
          default: new Header({
            children: [createParagraph(' ')], // Espacio en blanco para el encabezado
          }),
        },
        footers: {
          default: new Footer({
            children: [createParagraph(' ')], // Espacio en blanco para el pie de página
          }),
        },
        children: [table],
      },
    ],
  })

  try {
    return await Packer.toBuffer(doc)
  } catch (error) {
    console.error('Error generating document:', error)
    throw error
  }
}

export default createDocument
