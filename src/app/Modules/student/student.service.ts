import config from '../../../config'
import { UserSchema } from './student.interface'
import { User } from './student.model'
import { generateStudentId } from './student.utils'

export const createUser = async (
  user: UserSchema
): Promise<UserSchema | null> => {
  const academicSemester = {
    year: '2025',
    code: '01',
  }
  const id = await generateStudentId(academicSemester)
  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw Error('Failed to create user')
  } else {
    return createdUser
  }
}
