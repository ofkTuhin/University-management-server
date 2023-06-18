export type GenericErrorMessage = {
  message: string
  path: string | number
}

export type GenericErrorResponse = {
  statusCode: number
  message: string
  errormessages: GenericErrorMessage[]
}
