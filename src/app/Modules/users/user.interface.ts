import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type UserSchema = {
  id: string
  role: string
  password: string
  student: Types.ObjectId | IStudent
  faculty: Types.ObjectId
  admin: Types.ObjectId
}

export type UserModel = Model<UserSchema, object>
