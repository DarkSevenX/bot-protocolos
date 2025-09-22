import { generateText } from 'ai'
import { google } from '../config/aiClient'
import { prompt } from '../prompts/prompts'
import { expectedKeys } from '../utils/expectedKeys'
import markdownToDocx from '../utils/markdownToDocx'
import createDocument from '../utils/createDocument'

interface DocxProtocolo {
  [key: string]: any[] // Idealmente usar DocxElement[]
}

export async function generateProtocolDocx(temas: string): Promise<Buffer> {
  const response = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: prompt(temas),
  })

  let protocolo: Record<string, string> = {}
  try {
    protocolo = JSON.parse(response.text)
  } catch {
    console.log(protocolo)
    throw new Error('El modelo no devolvió un JSON válido')
  }

  const missingKeys = expectedKeys.filter((key) => !(key in protocolo))
  if (missingKeys.length > 0) {
    throw new Error(`Faltan las claves: ${missingKeys.join(', ')}`)
  }

  const docxProtocolo: DocxProtocolo = {}
  for (const key of expectedKeys) {
    const markdownText = protocolo[key]
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

  return await createDocument(docxProtocolo as any)
}
