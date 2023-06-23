import express from 'express'
import { depertmentRouter } from '../Modules/academicDepertment/academicDepertment.router'
import { facultyRouter } from '../Modules/academicFaculty/academicFaculty.router'
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
  {
    path: '/academic-faculties',
    route: facultyRouter,
  },
  {
    path: '/academic-depertments',
    route: depertmentRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
