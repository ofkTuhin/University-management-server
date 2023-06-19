import { Model } from 'mongoose'

export type UserSchema = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<UserSchema, object>
