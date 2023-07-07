/* eslint-disable no-console */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IManagementDepartment } from './managementDepertment.interface'
import { ManagementDepartmentService } from './managementDepertment.service'

const createaDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicDepartmentData } = req.body
  console.log(req.body)
  const managementDepartment =
    await ManagementDepartmentService.createManagementDepartment(
      acdemicDepartmentData
    )

  sendResponse<IManagementDepartment>(res, {
    success: true,
    message: 'Department created successfully',
    result: managementDepartment,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, ['searchTerm', 'title'])
  const allDepartments = await ManagementDepartmentService.getAllDepartments(
    paginationoptions,
    filters
  )

  sendResponse<IManagementDepartment[]>(res, {
    success: true,
    message: 'all Departments fetched successfully',
    result: allDepartments.data,
    meta: allDepartments.meta,
  })
})
// get single Department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ManagementDepartmentService.getSingleDepartment(id)

  sendResponse<IManagementDepartment>(res, {
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
  const result = await ManagementDepartmentService.updateDepartment(
    id,
    updatedData
  )

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Department successfully !',
    result: result,
  })
})

// delete faculty
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ManagementDepartmentService.deleteByIdFromDB(id)

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department deleted successfully',
    result: result,
  })
})
export const managementDepartmentController = {
  createaDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
