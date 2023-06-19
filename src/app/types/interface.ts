export type GenericErrorMessage = {
  message: string
  path: string | number
}

export type GenericErrorResponse = {
  statusCode: number
  message: string
  errormessages: GenericErrorMessage[]
}

export type IPagination = {
  limit: number
  page: number

  sortBy: string
  sortOrder: string
}
