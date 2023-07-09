import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyService } from './academicFaculty.service'

const createaFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicFacultyData } = req.body
  const academicFaculty = await AcademicFacultyService.createAcademicFaculty(
    acdemicFacultyData,
  )

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    message: 'Faculty created successfully',
    result: academicFaculty,
  })
})

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, ['searchTerm', 'title'])
  const allFacultys = await AcademicFacultyService.getAllFacultys(
    paginationoptions,
    filters,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    message: 'all Facultys fetched successfully',
    result: allFacultys.data,
    meta: allFacultys.meta,
  })
})
// get single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    result: result,
  })
})
// update Faculty
// get single Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicFacultyService.updateFaculty(id, updatedData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Faculty successfully !',
    result: result,
  })
})

// delete faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteByIdFromDB(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    result: result,
  })
})
export const academicFacultyController = {
  createaFaculty,
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
