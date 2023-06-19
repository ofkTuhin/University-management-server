import mongoose from 'mongoose'
import {
  GenericErrorMessage,
  GenericErrorResponse,
} from '../app/types/interface'

export const handleValidationErrors = (
  error: mongoose.Error.ValidationError
): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = Object.keys(error.errors).map(
    (el: string) => {
      return {
        path: error.errors[el].path,
        message: error.errors[el].message,
      }
    }
  )
  const statusCode = 500
  return {
    message: 'Validation Error',
    errormessage: errors,
    statusCode: statusCode,
  }
}
