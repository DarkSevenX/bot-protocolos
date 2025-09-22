import { RequestHandler } from 'express'
import {generateProtocolDocx} from '../service/service'

export const protocolController: RequestHandler = async (req, res) => {
  const { temas } = req.body
  if (!temas) {
    return res.status(400).json({ message: 'debes enviar al menos un tema' })
  }

  const buffer = await generateProtocolDocx(temas)
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=Protocolo_individual.docx',
  )
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  res.send(buffer)
}
