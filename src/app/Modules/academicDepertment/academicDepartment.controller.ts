/* eslint-disable no-console */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentService } from './academicDepartment.service'

const createaDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicDepartmentData } = req.body
  console.log(req.body)
  const academicDepartment =
    await AcademicDepartmentService.createAcademicDepartment(
      acdemicDepartmentData,
    )

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    message: 'Department created successfully',
    result: academicDepartment,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, ['searchTerm', 'title'])
  const allDepartments = await AcademicDepartmentService.getAllDepartments(
    paginationoptions,
    filters,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    success: true,
    message: 'all Departments fetched successfully',
    result: allDepartments.data,
    meta: allDepartments.meta,
  })
})
// get single Department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully !',
    result: result,
  })
})
// update Department
// get single Department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData,
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Department successfully !',
    result: result,
  })
})

// delete faculty
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.deleteByIdFromDB(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    result: result,
  })
})
export const academicDepartmentController = {
  createaDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
