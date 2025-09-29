import { RequestHandler } from 'express'

const ping: RequestHandler = (_req, res) => {
  return res.status(200).json({
    message: 'pong',
  })
}

export { ping }
