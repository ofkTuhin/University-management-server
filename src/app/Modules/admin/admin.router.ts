import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import { adminController } from './admin.controller'
import { AdminValidaion } from './admin.validation'
const router = express.Router()

router.get('/:id', adminController.getSingleAdmin)
router.get('/', adminController.getAllAdmins)
router.delete('/:id', adminController.deleteAdmin)
router.patch(
  '/:id',
  zodValidationHandler(AdminValidaion.updateAdminZodSchema),
  adminController.updateAdmin,
)
export const adminRouter = router
