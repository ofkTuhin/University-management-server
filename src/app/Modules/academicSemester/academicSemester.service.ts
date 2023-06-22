/* eslint-disable no-console */
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'
import {
  academicSemesterTitleCode,
  searchField,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
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
  paginationoptions: Partial<IPagination>,
  filters: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const {
    page = 1,
    limit = 10,
    skip,
    sortBy,
    sortOrder,
  } = paginationHelpers.calculatePagination(paginationoptions)
  const { searchTerm, ...filtesData } = filters
  // search condition

  const andconditon = []

  if (searchTerm) {
    andconditon.push({
      $or: searchField.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtesData).length > 0) {
    andconditon.push({
      $and: Object.entries(filtesData).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  // all conditions
  const whereConditions = andconditon.length > 0 ? { $and: andconditon } : {}
  const result = await AcademicSemester.find({ whereConditions })
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

// get single semster
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
// update semester
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCode[payload?.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester already exist')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
}
