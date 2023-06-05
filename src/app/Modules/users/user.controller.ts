import { Request, Response } from 'express'
import { createUser } from './user.service'

export const createaUserController = async (req: Request, res: Response) => {
  const userData = req.body
  try {
    await createUser(userData)
    res.status(200).json({
      message: 'User created successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}
