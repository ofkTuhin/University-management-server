import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicSemesterController } from './academicSemester.controller'
import { AcademicSemesterZodValidation } from './academicSemester.validation'
const router = express.Router()

router.post(
  '/create-semester',
  zodValidationHandler(
    AcademicSemesterZodValidation.createAcademicSemesterZodValidation
  ),
  academicSemesterController.createaSemester
)
router.get('/all-semesters', academicSemesterController.getAllSemesters)
export const semesterRouter = router
