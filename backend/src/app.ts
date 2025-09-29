import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import { protocolController } from './controller/controller'
import { verifyApikey } from './middleware/verifyApiKey'
import {ping} from './controller/ping'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(
  cors({
    origin: process.env.FRONT_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'key'],
  }),
)
app.use(express.json())

app.use(errorHandler)

app.post('/api/protocol', verifyApikey, protocolController)
app.get('/api/ping', ping)

app.listen(port)
console.log('api corriendo en localhost:' + port)
