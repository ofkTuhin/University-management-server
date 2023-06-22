/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleCastError from '../../errors/handleCastError'
import { handleValidationErrors } from '../../errors/handlevalidationError'
import logger from '../../share/logger'
import { GenericErrorMessage } from '../types/interface'

export const globalErrorhandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statuscode = 500
  let message = 'something went wrong'
  let errormessages: GenericErrorMessage[] = []
  config.env !== 'production'
    ? console.log(error)
    : logger.errorlog.error(error)
  if (error.name === 'ValidationError') {
    const siplifiedErrors = handleValidationErrors(error)
    statuscode = siplifiedErrors.statusCode
    errormessages = siplifiedErrors.errormessages
    message = siplifiedErrors.message
  } else if (error instanceof Error) {
    message = error.message
    errormessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statuscode = simplifiedError.statusCode
    message = simplifiedError.message
    errormessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statuscode = error?.statusCode
    message = error.message
    errormessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statuscode).json({
    success: false,
    message,
    errormessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  })
  next()
}
