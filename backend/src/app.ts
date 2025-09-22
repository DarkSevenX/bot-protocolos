import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import { protocolController } from './controller/controller'
import { verifyApikey } from './middleware/verifyApiKey'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(
  cors({
    origin: [`http://localhost:5173`, `${process.env.FRONT_PATH}`],
  }),
)

app.use(verifyApikey)
app.use(errorHandler)

app.post('/api/protocol', protocolController)

app.listen(port)
console.log('api corriendo en localhost:' + port)
