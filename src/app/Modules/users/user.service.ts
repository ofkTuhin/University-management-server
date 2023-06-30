/* eslint-disable no-console */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { UserSchema } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

export const createUser = async (
  user: UserSchema,
  student: IStudent
): Promise<UserSchema | null> => {
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean()
  let newStudentData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    user.id = id
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
