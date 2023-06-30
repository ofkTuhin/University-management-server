import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { sendResponse } from '../../../share/sendResponse'
import { createUser } from './student.service'

const createaUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = await createUser(req.body)
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
