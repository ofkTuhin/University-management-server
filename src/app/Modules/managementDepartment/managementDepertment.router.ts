import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'

import { managementDepartmentController } from './managementDepertment.controller'
import { ManagementDepartmentZodValidation } from './managementDepertment.validation'
const router = express.Router()
// create Department
router.post(
  '/create-management',
  zodValidationHandler(
    ManagementDepartmentZodValidation.createManagementDepartmentZodValidation,
  ),
  managementDepartmentController.createaDepartment,
)

// get all Department
router.get('/', managementDepartmentController.getAllDepartments)

// get single Department
router.get('/:id', managementDepartmentController.getSingleDepartment)

// update Department
router.patch(
  '/:id',
  zodValidationHandler(
    ManagementDepartmentZodValidation.updateManagementDepartmentZodValidation,
  ),
  managementDepartmentController.updateDepartment,
)
// delete Department
router.delete('/:id', managementDepartmentController.deleteDepartment)
export const managementRouter = router
