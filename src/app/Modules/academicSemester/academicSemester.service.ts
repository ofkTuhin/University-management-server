/* eslint-disable no-console */
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'
import { academicSemesterTitleCode } from './academicSemester.conatant'
import { IAcademiSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
const createAcademicSemester = async (
  payload: IAcademiSemester
): Promise<IAcademiSemester | null> => {
  if (academicSemesterTitleCode[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester already exist')
  }
  const result = await AcademicSemester.create(payload)

  return result
}
// get all semesters

type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllSemesters = async (
  paginationoptions: Partial<IPagination>
): Promise<IGenericResponse<IAcademiSemester[]>> => {
  const {
    page = 1,
    limit = 10,
    skip,
    sortBy,
    sortOrder,
  } = paginationHelpers.calculatePagination(paginationoptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total: total,
    },
    data: result,
  }
}
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
}
