import {
  Table,
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  Hyperlink,
  AlignmentType,
  HeadingLevel,
} from 'docx';
import { marked } from 'marked';
import * as cheerio from 'cheerio';

// Configuración centralizada de estilos
const STYLES = {
  fonts: {
    default: 'Arial',
    code: 'Courier New',
  },
  sizes: {
    heading: [48, 36, 28, 24, 22, 20], // H1 a H6 (half-points)
    text: 24, // 12 puntos
  },
  colors: {
    link: '0000FF',
  },
  spacing: {
    line: 300, // 1.5
    after: 200,
    before: 200,
  },
  table: {
    borders: { style: 'single', size: 4 },
    padding: { top: 10, bottom: 10, left: 200, right: 200 },
  },
};

// Función auxiliar para traversing DOM y construir TextRun/Hyperlink con estilos acumulados
const buildRunsFromNode = (node, $, currentStyle = {}) => {
  const runs = [];
  if (node.type === 'text') {
    runs.push(
      new TextRun({
        text: node.data.trim() ? node.data : '',
        font: currentStyle.font || STYLES.fonts.default,
        size: currentStyle.size || STYLES.sizes.text,
        bold: !!currentStyle.bold,
        italics: !!currentStyle.italics,
        underline: currentStyle.underline ? {} : undefined,
        color: currentStyle.color,
      })
    );
  } else if (node.type === 'tag') {
    let newStyle = { ...currentStyle };
    switch (node.name) {
      case 'strong':
      case 'b':
        newStyle.bold = true;
        break;
      case 'em':
      case 'i':
        newStyle.italics = true;
        break;
      case 'u':
        newStyle.underline = true;
        break;
      case 'code':
        newStyle.font = STYLES.fonts.code;
        break;
      case 'a':
        const href = node.attribs.href;
        const linkRuns = [];
        $(node)
          .contents()
          .each((_, child) => linkRuns.push(...buildRunsFromNode(child, $, newStyle)));
        runs.push(
          new Hyperlink({
            children: linkRuns,
            link: href,
          })
        );
        return runs; // Salir temprano para hyperlink
      default:
        break;
    }
    $(node)
      .contents()
      .each((_, child) => runs.push(...buildRunsFromNode(child, $, newStyle)));
  }
  return runs;
};

// Función auxiliar para crear Paragraph desde nodo HTML
const createParagraphFromNode = (node, $, options = {}) => {
  const runs = buildRunsFromNode(node, $);
  return new Paragraph({
    children: runs,
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: STYLES.spacing,
    indent: options.indent,
    bullet: options.bullet,
    numbering: options.numbering,
  });
};

// Función auxiliar para crear Table desde nodo <table>
const createTableFromNode = (node, $) => {
  const rows = [];
  $(node)
    .find('tr')
    .each((_, tr) => {
      const cells = [];
      $(tr)
        .find('th, td')
        .each((_, cell) => {
          const cellParagraphs = [];
          $(cell)
            .contents()
            .each((_, child) => {
              if (child.type === 'tag' && child.name === 'p') {
                cellParagraphs.push(createParagraphFromNode(child, $));
              } else {
                cellParagraphs.push(createParagraphFromNode(cell, $)); // Fallback
              }
            });
          cells.push(
            new TableCell({
              children: cellParagraphs,
              borders: STYLES.table.borders,
              margins: STYLES.table.padding,
            })
          );
        });
      rows.push(new TableRow({ children: cells }));
    });
  return new Table({ rows });
};

// Función principal: Parse Markdown to docx elements
const markdownToDocx = (markdown) => {
  if (typeof markdown !== 'string' || !markdown.trim()) {
    throw new Error('Markdown must be a non-empty string');
  }

  // Parse Markdown a HTML con marked
  const html = marked.parse(markdown, { gfm: true, breaks: true });
  const $ = cheerio.load(html);
  const docElements = [];

  $('body > *').each((_, elem) => {
    const tag = elem.tagName.toLowerCase();
    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        const level = parseInt(tag[1], 10);
        const headingRuns = buildRunsFromNode(elem, $, { bold: true, size: STYLES.sizes.heading[level - 1] });
        docElements.push(
          new Paragraph({
            children: headingRuns,
            heading: HeadingLevel[`HEADING_${level}`],
            spacing: STYLES.spacing,
          })
        );
        break;
      case 'p':
        docElements.push(createParagraphFromNode(elem, $));
        break;
      case 'ul':
      case 'ol':
        const isOrdered = tag === 'ol';
        $(elem)
          .find('> li')
          .each((_index, li) => {
            docElements.push(
              createParagraphFromNode(li, $, {
                bullet: isOrdered ? undefined : { level: 0 },
                numbering: isOrdered ? [{ level: 0, reference: 'list-num' }] : undefined, // Necesita definir numbering en Document si usas
              })
            );
          });
        break;
      case 'table':
        docElements.push(createTableFromNode(elem, $));
        break;
      case 'blockquote':
        docElements.push(createParagraphFromNode(elem, $, { indent: { left: 720 } })); // Indent para cita (720 twips ~0.5in)
        break;
      case 'pre':
        const codeRuns = buildRunsFromNode(elem, $, { font: STYLES.fonts.code });
        docElements.push(new Paragraph({ children: codeRuns, spacing: STYLES.spacing }));
        break;
      case 'hr':
        docElements.push(new Paragraph({ thematicBreak: true }));
        break;
      default:
        console.warn(`Tag "${tag}" not fully supported.`);
        break;
    }
  });

  return docElements;
};

export default markdownToDocx;
