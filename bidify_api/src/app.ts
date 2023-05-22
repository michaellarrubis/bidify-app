import cors from 'cors'
import cookieParser from 'cookie-parser'
import express, { Express, Request, Response, NextFunction } from 'express'

import { HttpException } from '@exceptions/HttpException'
import { handler, isOperational } from '@middlewares/error.middleware'
import DB from './db'
import V1Routes from './v1/routes'

const app: Express = express()

app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: true,
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Bidify API')
})
app.get('/health', (req, res) => {
  res.status(200).send('Health passed.')
})
app.use('/v1', V1Routes)

// handle unknown routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new HttpException(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (!isOperational(err)) {
    next(err)
  }
  handler(err, res)
})

async function closeGracefully(signal: string) {
  console.log(`Received signal: ${signal}.`)
  await DB.sequelize.close()
  process.kill(process.pid, signal)
}

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  process.exit(1)
})

// handle unhandledrejection
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  process.exit(1)
})

process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

export default app
