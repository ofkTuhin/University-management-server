import config from '../../../config'
import { UserSchema } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

export const createUser = async (
  user: UserSchema
): Promise<UserSchema | null> => {
  const id = await generateUserId()
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