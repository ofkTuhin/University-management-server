/* eslint-disable no-console */
import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { sendResponse } from '../../../share/sendResponse'
import { UserService } from './user.service'

const createaUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body

    const user = await UserService.createStudent(userData, student)
    sendResponse(res, {
      success: true,
      message: 'user created successfully',
      result: user,
    })
  }
)
const createaFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body

    const user = await UserService.createFaculty(userData, faculty)
    sendResponse(res, {
      success: true,
      message: 'user created successfully',
      result: user,
    })
  }
)

export default {
  createaUserController,
  createaFacultyController,
}
