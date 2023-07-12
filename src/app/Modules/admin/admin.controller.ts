/* eslint-disable no-console */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { adminFilterableFields } from './admin.constant'
import { IAdmin } from './admin.interface'
import { AdminService } from './admin.service'

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, adminFilterableFields)
  const allAdmins = await AdminService.getAllAdmins(paginationoptions, filters)

  sendResponse<IAdmin[]>(res, {
    success: true,
    message: 'all admins fetched successfully',
    result: allAdmins.data,
    meta: allAdmins.meta,
  })
})
// get single semester
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.getSingleAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    result: result,
  })
})
// update semester

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const updatedData = req.body
  const result = await AdminService.updateAdmin(id, updatedData)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester successfully !',
    result: result,
  })
})

// delete semester
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.deleteAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    result: result,
  })
})
export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
