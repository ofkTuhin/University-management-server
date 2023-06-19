import { NextFunction, Request, Response } from 'express'
import { createUser } from './user.service'

const createaUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body
  try {
    await createUser(userData)
    res.status(200).json({
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createaUserController,
}
