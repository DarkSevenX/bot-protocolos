import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import { protocolController } from './controller/controller'
import { verifyApikey } from './middleware/verifyApiKey'
import {ping} from './controller/ping'
import {corsOptions} from './config/corsOptions'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors(corsOptions))
app.use(express.json())

app.post('/api/protocol', verifyApikey, protocolController)
app.get('/api/ping', ping)

app.use(errorHandler)

app.listen(port)
console.log('api corriendo en localhost:' + port)
