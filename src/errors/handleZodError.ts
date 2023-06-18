import { ZodError, ZodIssue } from 'zod'

import {
  GenericErrorMessage,
  GenericErrorResponse,
} from '../app/types/interface'

const handleZodError = (error: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errormessages: errors,
  }
}

export default handleZodError
