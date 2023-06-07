import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './share/logger'
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.successlog.info('database connect successfully')
    app.listen(config.port, () => {
      logger.successlog.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.errorlog.error('error occured in db connection')
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

dbConnect()
