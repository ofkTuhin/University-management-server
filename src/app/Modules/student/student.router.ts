import express from 'express'
import zodValidationHandler from '../../middleware/zodValidationHandler'
import { studentController } from './student.controller'
import { StudentValidaion } from './student.validation'
const router = express.Router()

router.get('/:id', studentController.getSingleStudent)
router.get('/', studentController.getAllStudents)
router.delete('/:id', studentController.deleteStudent)
router.patch(
  '/:id',
  zodValidationHandler(StudentValidaion.updateStudentZodSchema),
  studentController.updateStudent,
)
export const studentRouter = router
