/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'
import { User } from '../users/user.model'
import { adminSearchableFields } from './admin.constant'
import { IAdmin, IAdminFilters } from './admin.interface'
import { Admin } from './admin.model'

// get all admins
type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllAdmins = async (
  paginationoptions: Partial<IPagination>,
  filters: IAdminFilters,
): Promise<IGenericResponse<IAdmin[]>> => {
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
      $or: adminSearchableFields.map(field => ({
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
  const result = await Admin.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicAdmin')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Admin.countDocuments()
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
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id })
  return result
}
// update student
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const existAdmin = await Admin.findOne({ id: id })

  if (!existAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found')
  }
  const { name, ...studentData } = payload
  const updateAdminData: Partial<IAdmin> = {
    ...studentData,
  }
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      ;(updateAdminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, updateAdminData, {
    new: true,
  })
  return result
}

// delete student
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const existAdmin = Admin.findOne({ id })
  if (!existAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const student = await Admin.findOneAndDelete({ id })
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
export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
