import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import { facultyController } from './faculty.controller'
import { FacultyValidaion } from './faculty.validation'
const router = express.Router()

router.get('/:id', facultyController.getSingleFaculty)
router.get('/', facultyController.getAllFacultys)
router.delete('/:id', facultyController.deleteFaculty)
router.patch(
  '/:id',
  zodValidationHandler(FacultyValidaion.updateFacultyZodSchema),
  facultyController.updateFaculty,
)
export const facultyRouter = router
