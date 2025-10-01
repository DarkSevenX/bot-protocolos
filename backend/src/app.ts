import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import { verifyApikey } from './middleware/verifyApiKey'
import { ping } from './controller/ping'
import { corsOptions } from './config/corsOptions'
//import logger from './middleware/showRequest'
import { dotConfig } from './config/dotenvConfig'
import protocolRoutes from './routes/protocolRoutes'

dotenv.config(dotConfig)

const app = express()
const port = process.env.PORT || 8000

app.use(cors(corsOptions))
app.use(express.json())
//app.use(logger)

app.use('/api', verifyApikey, protocolRoutes)
app.get('/api/ping', ping)

app.use(errorHandler)
app.listen(port)
// console.log('api corriendo en localhost:' + port)
