import express from 'express'
import { semesterRouter } from '../Modules/academicSemester/academicSemester.router'
import { userRouter } from '../Modules/users/user.router'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semester',
    route: semesterRouter,
  },
  // {
  //   path: '/academic-faculties',
  //   route: AcademicFacultyRoutes,
  // },
  // {
  //   path: '/academic-departments',
  //   route: academicDepartmentRoutes,
  // },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
