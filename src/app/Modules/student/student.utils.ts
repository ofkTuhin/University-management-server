import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './student.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0') //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`
  return incrementedId
}
// find last faculty

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id
}

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0') //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`
  return incrementedId
}
