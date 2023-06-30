/* eslint-disable no-console */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'

import { searchField } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.create(payload)

  return result
}
// get all Departments

type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllDepartments = async (
  paginationoptions: Partial<IPagination>,
  filters: IAcademicDepartmentFilter
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculties')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()
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
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id)
  return result
}
// update Department
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

// delete faculty
const deleteByIdFromDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteByIdFromDB,
}
