import { createGoogleGenerativeAI } from '@ai-sdk/google'
import dotenv from 'dotenv'
import {dotConfig} from './dotenvConfig'

dotenv.config(dotConfig)

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
})
