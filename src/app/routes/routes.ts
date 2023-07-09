import express from 'express'
import { departmentRouter } from '../Modules/academicDepertment/academicDepartment.router'
import { academicFacultyRouter } from '../Modules/academicFaculty/academicFaculty.router'
import { semesterRouter } from '../Modules/academicSemester/academicSemester.router'
import { facultyRouter } from '../Modules/faculty/faculty.router'
import { managementRouter } from '../Modules/managementDepartment/managementDepertment.router'
import { studentRouter } from '../Modules/student/student.router'
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
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: departmentRouter,
  },
  {
    path: '/student',
    route: studentRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
  {
    path: '/management',
    route: managementRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
