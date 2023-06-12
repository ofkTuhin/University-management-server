/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './share/logger'

// unhandled exception

process.on('uncaughtException', err => {
  logger.errorlog.error(err)
})

// SIGTERM handler
let server: Server
process.on('SIGTERM', () => {
  logger.errorlog.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      config.env !== 'production'
        ? console.log(`Example app listening on port ${config.port}`)
        : logger.successlog.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    config.env !== 'production'
      ? console.log(error)
      : logger.errorlog.error(error)
  }
  process.on('unhandledRejection', err => {
    console.log('unhandled rejection occur close the srver')
    if (server) {
      server.close(() => {
        logger.errorlog.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

dbConnect()
