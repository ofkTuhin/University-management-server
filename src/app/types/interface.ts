import { SortOrder } from 'mongoose'

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
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}
