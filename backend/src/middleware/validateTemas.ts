import { RequestHandler } from 'express'

export const validateTemas: RequestHandler = (req, res, next) => {
  const temas = req.body.temas
  if (!temas) {
    return res.status(400).json({ message: 'debes enviar al menos un tema' })
  }
  next()
}
