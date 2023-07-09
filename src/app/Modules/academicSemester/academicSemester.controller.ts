import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

const createaSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicSemesterData } = req.body
  const academicSemester = await AcademicSemesterService.createAcademicSemester(
    acdemicSemesterData,
  )

  sendResponse<IAcademicSemester>(res, {
    success: true,
    message: 'semester created successfully',
    result: academicSemester,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year'])
  const allSemesters = await AcademicSemesterService.getAllSemesters(
    paginationoptions,
    filters,
  )

  sendResponse<IAcademicSemester[]>(res, {
    success: true,
    message: 'all semesters fetched successfully',
    result: allSemesters.data,
    meta: allSemesters.meta,
  })
})
// get single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully !',
    result: result,
  })
})
// update semester
// get single semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester successfully !',
    result: result,
  })
})

// delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully !',
    result: result,
  })
})
export const academicSemesterController = {
  createaSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
