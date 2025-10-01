import { ErrorRequestHandler } from 'express'

interface Error {
  message?: string
  status?: number
}

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, _next) => {
  const message = error.message || 'internal server error'
  const status = error.status || 500

  res.status(status).json({ message })
}

export default errorHandler
