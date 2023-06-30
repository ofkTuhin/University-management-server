import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentZodValidation } from './academicDepartment.validation'
const router = express.Router()
// create Department
router.post(
  '/create-Department',
  zodValidationHandler(
    AcademicDepartmentZodValidation.createAcademicDepartmentZodValidation
  ),
  academicDepartmentController.createaDepartment
)

// get all Department
router.get('/all-Departments', academicDepartmentController.getAllDepartments)

// get single Department
router.get(
  '/single-Department/:id',
  academicDepartmentController.getSingleDepartment
)

// update Department
router.patch(
  '/update-Department/:id',
  zodValidationHandler(
    AcademicDepartmentZodValidation.updateAcademicDepartmentZodValidation
  ),
  academicDepartmentController.updateDepartment
)
// delete Department
router.delete(
  '/delete-Department/:id',
  academicDepartmentController.deleteDepartment
)
export const DepartmentRouter = router
