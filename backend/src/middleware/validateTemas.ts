import { RequestHandler } from 'express'

export const validateTemas: RequestHandler = (req, res, next) => {
  if (!req.body || !req.body.temas) {
    return res.status(400).json({ 
      message: 'debes enviar al menos un tema' 
    })
  }
  if (!req.body.type) {
    return res.status(400).json({ 
      message: 'no hay tipo especificado' 
    })
  }
  next()
}
