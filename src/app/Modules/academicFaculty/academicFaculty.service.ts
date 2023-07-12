/* eslint-disable no-console */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPagination } from '../../types/interface'

import { searchField } from './academicFaculty.constant'
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
const createAcademicFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload)

  return result
}
// get all Facultys

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
  filters: IAcademicFacultyFilter,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()
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
const getSingleFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}
// update Faculty
const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// delete faculty
const deleteByIdFromDB = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteByIdFromDB,
}
