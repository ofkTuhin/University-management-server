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
  payload: IAcademicSemester,
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
  filters: IAcademicSemesterFilter,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const {
    page = 1,
    limit = 10,
    skip,
    sortBy,
    sortOrder,
  } = paginationHelpers.calculatePagination(paginationoptions)
  const { searchTerm, ...filtersData } = filters
  // search condition

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: searchField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  // all conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await AcademicSemester.find(whereConditions)
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
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
// update semester
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
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

// delete semester
const deleteSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
