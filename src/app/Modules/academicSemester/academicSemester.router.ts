import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicSemesterController } from './academicSemester.controller'
import { AcademicSemesterZodValidation } from './academicSemester.validation'
const router = express.Router()
// create semester
router.post(
  '/create-semester',
  zodValidationHandler(
    AcademicSemesterZodValidation.createAcademicSemesterZodValidation
  ),
  academicSemesterController.createaSemester
)

// get all semester
router.get('/all-semesters', academicSemesterController.getAllSemesters)

// get single semester
router.get('/single-semester/:id', academicSemesterController.getSingleSemester)

// update semester
router.patch(
  '/update-semester/:id',
  zodValidationHandler(
    AcademicSemesterZodValidation.updateAcademicSemesterZodValidation
  ),
  academicSemesterController.updateSemester
)
export const semesterRouter = router
