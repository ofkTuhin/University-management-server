import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import userController from './user.controller'
import { useZodValiadion } from './user.validation'
const router = express.Router()

router.post(
  '/create-student',
  zodValidationHandler(useZodValiadion.createUserZodSchema),
  userController.createaUserController
)
router.post(
  '/create-faculty',
  zodValidationHandler(useZodValiadion.createFacultyZodSchema),
  userController.createaFacultyController
)
export const userRouter = router
