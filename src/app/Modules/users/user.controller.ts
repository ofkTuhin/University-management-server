import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { sendResponse } from '../../../share/sendResponse'
import { createUser } from './user.service'

const createaUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const user = await createUser(userData, student)
    sendResponse(res, {
      success: true,
      message: 'user created successfully',
      result: user,
    })
  }
)

export default {
  createaUserController,
}
