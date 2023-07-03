/* eslint-disable no-console */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { studentFilterableFields } from './student.constant'
import { IStudent } from './student.interface'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const filters = pick(req.query, studentFilterableFields)
  const allStudents = await StudentService.getAllStudents(
    paginationoptions,
    filters
  )

  sendResponse<IStudent[]>(res, {
    success: true,
    message: 'all students fetched successfully',
    result: allStudents.data,
    meta: allStudents.meta,
  })
})
// get single semester
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.getSingleStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully !',
    result: result,
  })
})
// update semester

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const updatedData = req.body
  const result = await StudentService.updateStudent(id, updatedData)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester successfully !',
    result: result,
  })
})

// delete semester
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully !',
    result: result,
  })
})
export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
