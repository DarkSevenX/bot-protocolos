import { generateText } from 'ai'
import { google } from '../config/aiClient'
import { colabExpectedKeys, expectedKeys } from '../utils/expectedKeys'
import markdownToDocx from '../utils/markdownToDocx'
import createIndividualDoc from '../utils/createIndividuaDoc'
import createColabDoc from '../utils/createColabDoc'
import { indivudualPrompt } from '../prompts/individualPrompt'
import { colabPrompt } from '../prompts/colabPrompt'

interface DocxProtocolo {
  [key: string]: any[]
}

type GeneratorOptions = {
  promptFn: (temas: string) => string
  expectedKeys: string[]
  createFn: (doc: any) => Promise<Buffer>
}

async function generateGenericDocx(
  temas: string,
  { promptFn, expectedKeys, createFn }: GeneratorOptions
): Promise<Buffer> {
  const response = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: promptFn(temas),
  })

  let parsed: Record<string, string> = {}
  try {
    parsed = JSON.parse(response.text)
  } catch(e: any) {
    throw new Error('El modelo no devolvió un JSON válido')
  }

  const missingKeys = expectedKeys.filter((key) => !(key in parsed))
  if (missingKeys.length > 0) {
    throw new Error(`Faltan las claves: ${missingKeys.join(', ')}`)
  }

  const docxProtocolo: DocxProtocolo = {}
  for (const key of expectedKeys) {
    const markdownText = parsed[key]
    if (typeof markdownText !== 'string') {
      throw new Error(`El valor de "${key}" no es un string válido`)
    }
    try {
      docxProtocolo[key] = markdownToDocx(markdownText)
    } catch (error: any) {
      throw new Error(
        `Error al convertir "${key}" de Markdown a docx: ${error.message}`,
      )
    }
  }

  return await createFn(docxProtocolo as any)
}

// Implementaciones concretas
export function generateIndividualDocx(temas: string) {
  return generateGenericDocx(temas, {
    promptFn: indivudualPrompt,
    expectedKeys,
    createFn: createIndividualDoc,
  })
}

export function generateColabDocx(temas: string) {
  return generateGenericDocx(temas, {
    promptFn: colabPrompt,
    expectedKeys: colabExpectedKeys,
    createFn: createColabDoc,
  })
}
