import { Router } from 'express'
import { protocolo } from '../controller/controller'
import { validateTemas } from '../middleware/validateTemas'
import { verifyApikey } from '../middleware/verifyApiKey'
import { ping } from '../controller/ping'

const protocolRoutes = Router()

protocolRoutes
  .post('/protocolo', validateTemas, verifyApikey, protocolo)
  .get('/ping', ping)

export default protocolRoutes
