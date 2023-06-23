import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicDepertmentController } from './academicDepertment.controller'
import { AcademicDepertmentZodValidation } from './academicDepertment.validation'
const router = express.Router()
// create depertment
router.post(
  '/create-depertment',
  zodValidationHandler(
    AcademicDepertmentZodValidation.createAcademicDepertmentZodValidation
  ),
  academicDepertmentController.createaDepertment
)

// get all depertment
router.get('/all-depertments', academicDepertmentController.getAllDepertments)

// get single depertment
router.get(
  '/single-depertment/:id',
  academicDepertmentController.getSingleDepertment
)

// update depertment
router.patch(
  '/update-depertment/:id',
  zodValidationHandler(
    AcademicDepertmentZodValidation.updateAcademicDepertmentZodValidation
  ),
  academicDepertmentController.updateDepertment
)
// delete depertment
router.delete(
  '/delete-depertment/:id',
  academicDepertmentController.deleteDepertment
)
export const depertmentRouter = router
