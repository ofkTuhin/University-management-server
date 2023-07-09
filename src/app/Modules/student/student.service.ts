/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'
import { User } from '../users/user.model'
import { studentSearchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'

// get all students

type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllStudents = async (
  paginationoptions: Partial<IPagination>,
  filters: IStudentFilters,
): Promise<IGenericResponse<IStudent[]>> => {
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
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments()
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
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
  return result
}
// update student
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const existStudent = await Student.findOne({ id: id })
  console.log(existStudent, 'exist')
  if (!existStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found')
  }
  const { name, localGuardian, guardian, ...studentData } = payload
  const updateStudentData: Partial<IStudent> = {
    ...studentData,
  }
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  // local guardian
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }

  // guardian
  // local guardian
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }
  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  })
  return result
}

// delete student
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const existStudent = Student.findOne({ id })
  if (!existStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const student = await Student.findOneAndDelete({ id })
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
export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
