export type GenericErrorMessage = {
  message: string
  path: string
}

export type GenericErrorResponse = {
  statusCode: number
  message: string
  errormessage: GenericErrorMessage[]
}
