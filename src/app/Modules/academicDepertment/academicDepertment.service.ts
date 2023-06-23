/* eslint-disable no-console */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'

import { searchField } from './academicDepertment.constant'
import {
  IAcademicDepertment,
  IAcademicDepertmentFilter,
} from './academicDepertment.interface'
import { AcademicDepertment } from './academicDepertment.model'
const createAcademicDepertment = async (
  payload: IAcademicDepertment
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepertment.create(payload)

  return result
}
// get all Depertments

type IGenericResponse<T> = {
  meta: {
    page: number | null
    limit: number | null
    total: number
  }
  data: T
}
const getAllDepertments = async (
  paginationoptions: Partial<IPagination>,
  filters: IAcademicDepertmentFilter
): Promise<IGenericResponse<IAcademicDepertment[]>> => {
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
  const result = await AcademicDepertment.find(whereConditions)
    .populate('academicFaculties')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepertment.countDocuments()
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
const getSingleDepertment = async (
  id: string
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepertment.findById(id)
  return result
}
// update Depertment
const updateDepertment = async (
  id: string,
  payload: Partial<IAcademicDepertment>
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepertment.findOneAndUpdate(
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
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepertment.findByIdAndDelete(id)
  return result
}

export const AcademicDepertmentService = {
  createAcademicDepertment,
  getAllDepertments,
  getSingleDepertment,
  updateDepertment,
  deleteByIdFromDB,
}
