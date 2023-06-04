import { Model, Schema, model } from 'mongoose'
import { UserSchema } from './user.interface'

type UserModel = Model<UserSchema, object>
const userSchema = new Schema<UserSchema>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserSchema, UserModel>('User', userSchema)
