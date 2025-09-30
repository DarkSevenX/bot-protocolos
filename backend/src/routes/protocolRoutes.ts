import { Router } from 'express'
import { colaborativo, individual } from '../controller/controller'

const protocolRoutes = Router()

protocolRoutes
  .post('/individual', individual)
  .post('/colab', colaborativo)
