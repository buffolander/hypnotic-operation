import cors from 'cors'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import http from 'http'

import { RegisterRoutes } from '../generated/tsoa/routes'
import { PreqinClient } from './models/preqin-client'
import { getEnv } from './utils'

// TODO: Add logger middleware
// TODO: Add error handling middleware
// TODO: Improve code annotations for API documentation

const PORT = getEnv('PORT', 'number', 9000)

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

RegisterRoutes(app)

app.use((_req: Request, res: Response) => res.sendStatus(404))

const main = async (port: number): Promise<void> => {
  let server: http.Server
  try {
    PreqinClient.getInstance()
    server = app.listen(port, () => console.info('Server On', port))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  const serverClose = (): void => {
    console.info('HTTP server closed')
    process.exit(0)
  }

  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received: closing HTTP server')
    server.close(serverClose)
  })
}

void main(PORT)
