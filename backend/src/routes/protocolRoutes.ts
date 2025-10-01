import { Router } from 'express'
import { protocolo } from '../controller/controller'
import {validateTemas} from '../middleware/validateTemas'

const protocolRoutes = Router()
protocolRoutes.use(validateTemas)

protocolRoutes
  .post('/protocolo', protocolo)

export default protocolRoutes
