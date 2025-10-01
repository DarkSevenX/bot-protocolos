import { RequestHandler } from 'express'
import { generateColabDocx, generateIndividualDocx } from '../service/service'

export const protocolo: RequestHandler = async (req, res) => {
  const { temas, type } = req.body
  let filename
  let buffer

  switch (type) {
    case 'individual':
      buffer = await generateIndividualDocx(temas)
      filename = 'Protocolo_individual.docx'
      break
    case 'colab':
      buffer = await generateColabDocx(temas)
      filename = 'Protocolo_colaborativo.docx'
      break
    default:
      return res.status(400).json({ error: 'Tipo de protocolo no válido' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  res.send(buffer)
}
