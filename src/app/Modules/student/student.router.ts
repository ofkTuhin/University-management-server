import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import userController from './student.controller'
import { StudentValidaion } from './student.validation'
const router = express.Router()

router.post(
  '/create-user',
  zodValidationHandler(StudentValidaion),
  userController.createaUserController
)

export const userRouter = router
