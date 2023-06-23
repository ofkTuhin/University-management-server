import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IAcademicDepertment } from './academicDepertment.interface'
import { AcademicDepertmentService } from './academicDepertment.service'

const createaDepertment = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicDepertmentData } = req.body
  const academicDepertment =
    await AcademicDepertmentService.createAcademicDepertment(
      acdemicDepertmentData
    )

  sendResponse<IAcademicDepertment>(res, {
    success: true,
    message: 'Depertment created successfully',
    result: academicDepertment,
  })
})

const getAllDepertments = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, ['searchTerm', 'title'])
  const allDepertments = await AcademicDepertmentService.getAllDepertments(
    paginationoptions,
    filters
  )

  sendResponse<IAcademicDepertment[]>(res, {
    success: true,
    message: 'all Depertments fetched successfully',
    result: allDepertments.data,
    meta: allDepertments.meta,
  })
})
// get single Depertment
const getSingleDepertment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepertmentService.getSingleDepertment(id)

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Depertment retrieved successfully !',
    result: result,
  })
})
// update Depertment
// get single Depertment
const updateDepertment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicDepertmentService.updateDepertment(
    id,
    updatedData
  )

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Depertment successfully !',
    result: result,
  })
})

// delete faculty
const deleteDepertment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepertmentService.deleteByIdFromDB(id)

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment deleted successfully',
    result: result,
  })
})
export const academicDepertmentController = {
  createaDepertment,
  getAllDepertments,
  getSingleDepertment,
  updateDepertment,
  deleteDepertment,
}
