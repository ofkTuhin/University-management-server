/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'
import { User } from '../users/user.model'
import { facultySearchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'

// get all facultys

type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllFacultys = async (
  paginationoptions: Partial<IPagination>,
  filters: IFacultyFilters
): Promise<IGenericResponse<IFaculty[]>> => {
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
      $or: facultySearchableFields.map(field => ({
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
  const result = await Faculty.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments()
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
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
  return result
}
// update student
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const existFaculty = await Faculty.findOne({ id: id })

  if (!existFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not found')
  }
  const { name, ...studentData } = payload
  const updateFacultyData: Partial<IFaculty> = {
    ...studentData,
  }
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  })
  return result
}

// delete student
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const existFaculty = Faculty.findOne({ id })
  if (!existFaculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const student = await Faculty.findOneAndDelete({ id })
    if (!student) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    await User.deleteOne({ student: id })
    session.commitTransaction()
    session.endSession()
    return student
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}
export const FacultyService = {
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
