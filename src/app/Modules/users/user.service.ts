/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { UserSchema } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'

const createStudent = async (
  user: UserSchema,
  student: IStudent,
): Promise<UserSchema | null> => {
  console.log(user)
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  user.role = 'student'

  console.log(user)
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean()
  const id = await generateStudentId(academicSemester as IAcademicSemester)
  let newStudentData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = id
    student.id = id
    console.log(user.id)
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // create user
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newStudentData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
  }
  if (newStudentData) {
    newStudentData = await User.findOne({ _id: newStudentData._id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    })
  }
  return newStudentData
}
// create faculty
const createFaculty = async (
  user: UserSchema,
  faculty: IFaculty,
): Promise<UserSchema | null> => {
  if (!user.password) {
    user.password = config.default_faculty_password as string
  }
  user.role = 'faculty'

  const id = await generateFacultyId()
  let newFacultyData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = id as string
    faculty.id = id as string

    const newFaculty = await Faculty.create([faculty], { session })
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    // create user
    user.faculty = newFaculty[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newFacultyData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
  }
  if (newFacultyData) {
    newFacultyData = await User.findOne({ _id: newFacultyData._id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    })
  }
  return newFacultyData
}

// create admin
const createAdmin = async (user: UserSchema, admin: IAdmin) => {
  console.log(user)
  if (!user.password) {
    user.password = config.default_admin_password as string
  }
  user.role = 'admin'
  const id = await generateAdminId()
  console.log(id, 'id')
  let newAdminData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // create admin
    user.id = id as string
    admin.id = id as string
    console.log(id)
    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // create user
    user.admin = newAdmin[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newAdminData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    console.log(error)
  }
  if (newAdminData) {
    newAdminData = await User.findOne({ _id: newAdminData._id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }
  return newAdminData
}
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
