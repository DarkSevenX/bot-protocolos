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

type DocxElement = Paragraph | Table

interface ProtocoloDocx {
  [key: string]: DocxElement[]
}

const STYLES = {
  fonts: { default: 'Arial' },
  sizes: { title: 28, text: 24 },
  colors: { title: '002060', text: '000000' },
  spacing: { line: 300, after: 20, before: 50 },
  margins: {
    cell: { top: 10, bottom: 10, left: 80, right: 80 },
    page: { top: 1250, bottom: 1250, left: 1500, right: 1500 },
  },
  table: { width: 9000, columnWidths: [9000] },
  page: { width: 12240, height: 15840 },
}

// === Helpers reutilizables ===
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

const createTableCell = (
  title: string,
  content: DocxElement[] | null,
  isMainTitle = false,
) =>
  new TableCell({
    children: [createParagraph(title, isMainTitle), ...(content ?? [])],
    margins: STYLES.margins.cell,
  })

export const createTableRow = (
  title: string,
  content: DocxElement[] | null,
  isMainTitle = false,
) =>
  new TableRow({
    children: [createTableCell(title, content, isMainTitle)],
  })

// === Configuración para cada tipo de protocolo ===
interface ProtocolConfig {
  title: string
  expectedKeys: string[]
  titleMap: Record<string, string>
  extraRows?: TableRow[]
  highlightTitle?: boolean // si true → centrado y azul
}

export async function createDocument(
  content: ProtocoloDocx,
  { title, expectedKeys, titleMap, extraRows = [], highlightTitle = true }: ProtocolConfig,
) {
  if (!content || typeof content !== 'object') {
    throw new Error('Content must be a valid object')
  }

  const missingKeys = expectedKeys.filter((key) => !(key in content))
  if (missingKeys.length > 0) {
    throw new Error(`Missing required keys: ${missingKeys.join(', ')}`)
  }

  // Filas
  const rows: TableRow[] = [
    createTableRow(title, null, highlightTitle),
    ...extraRows,
    ...expectedKeys.map((key) =>
      createTableRow(titleMap[key] ?? key, content[key] as DocxElement[] , false),
    ),
  ]

  const table = new Table({
    alignment: AlignmentType.CENTER,
    rows,
    width: { size: STYLES.table.width, type: 'dxa' },
    columnWidths: STYLES.table.columnWidths,
  })

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
        headers: { default: new Header({ children: [createParagraph(' ')] }) },
        footers: { default: new Footer({ children: [createParagraph(' ')] }) },
        children: [table],
      },
    ],
  })

  return await Packer.toBuffer(doc)
}
