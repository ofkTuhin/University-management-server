import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import userController from './user.controller'
import createZodValidationSchema from './user.validation'
const router = express.Router()

router.post(
  '/create-user',
  zodValidationHandler(createZodValidationSchema),
  userController.createaUserController
)

export default router
