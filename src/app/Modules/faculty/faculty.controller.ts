/* eslint-disable no-console */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { facultyFilterableFields } from './faculty.constant'
import { IFaculty } from './faculty.interface'
import { FacultyService } from './faculty.service'

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, facultyFilterableFields)
  const allFacultys = await FacultyService.getAllFacultys(
    paginationoptions,
    filters
  )

  sendResponse<IFaculty[]>(res, {
    success: true,
    message: 'all facultys fetched successfully',
    result: allFacultys.data,
    meta: allFacultys.meta,
  })
})
// get single semester
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    result: result,
  })
})
// update semester

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const updatedData = req.body
  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester successfully !',
    result: result,
  })
})

// delete semester
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    result: result,
  })
})
export const facultyController = {
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
