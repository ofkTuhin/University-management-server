import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyZodValidation } from './academicFaculty.validation'
const router = express.Router()
// create faculty
router.post(
  '/create-faculty',
  zodValidationHandler(
    AcademicFacultyZodValidation.createAcademicFacultyZodValidation,
  ),
  academicFacultyController.createaFaculty,
)

// get all faculty
router.get('/all-facultys', academicFacultyController.getAllFacultys)

// get single faculty
router.get('/single-faculty/:id', academicFacultyController.getSingleFaculty)

// update faculty
router.patch(
  '/update-faculty/:id',
  zodValidationHandler(
    AcademicFacultyZodValidation.updateAcademicFacultyZodValidation,
  ),
  academicFacultyController.updateFaculty,
)
// delete faculty
router.delete('/delete-faculty/:id', academicFacultyController.deleteFaculty)
export const academicFacultyRouter = router
