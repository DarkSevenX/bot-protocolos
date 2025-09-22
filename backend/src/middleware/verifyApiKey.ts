import { RequestHandler } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const verifyApikey: RequestHandler = (req,res,next) => {
  const apiKey = req.headers['key']
  const validApiKey = process.env.API_KEY

  if (!apiKey) {
    return res.status(401).json({
      message: 'no api key provided'
    })
  }

  if (apiKey !== validApiKey ) {
    return res.status(401).json({ 
      message: 'error, API key invalida. No autorizado'
    })
  }

  next()
}
