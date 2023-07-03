/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { UserSchema } from './user.interface'
import { User } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'

const createStudent = async (
  user: UserSchema,
  student: IStudent
): Promise<UserSchema | null> => {
  console.log(user)
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  user.role = 'student'

  console.log(user)
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
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
  faculty: IFaculty
): Promise<UserSchema | null> => {
  console.log(user)
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
export const UserService = {
  createStudent,
  createFaculty,
}
