import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { academicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentZodValidation } from './academicDepartment.validation'
const router = express.Router()
// create Department
router.post(
  '/create-department',
  zodValidationHandler(
    AcademicDepartmentZodValidation.createAcademicDepartmentZodValidation,
  ),
  academicDepartmentController.createaDepartment,
)

// get all Department
router.get('/all-departments', academicDepartmentController.getAllDepartments)

// get single Department
router.get(
  '/single-department/:id',
  academicDepartmentController.getSingleDepartment,
)

// update Department
router.patch(
  '/update-department/:id',
  zodValidationHandler(
    AcademicDepartmentZodValidation.updateAcademicDepartmentZodValidation,
  ),
  academicDepartmentController.updateDepartment,
)
// delete Department
router.delete(
  '/delete-department/:id',
  academicDepartmentController.deleteDepartment,
)
export const departmentRouter = router
