import mongoose from 'mongoose'
import { GenericErrorMessage } from '../app/types/interface'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}

export default handleCastError
