export const corsOptions = {
  origin: process.env.FRONT_PATH,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'key'],
}
