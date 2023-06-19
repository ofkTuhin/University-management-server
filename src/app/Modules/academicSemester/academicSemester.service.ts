import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCode } from './academicSemester.conatant'
import { IAcademiSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
const createAcademicSemester = async (
  payload: IAcademiSemester
): Promise<IAcademiSemester | null> => {
  if (academicSemesterTitleCode[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester already exist')
  }
  const result = await AcademicSemester.create(payload)

  return result
}

export const AcademicSemesterService = {
  createAcademicSemester,
}
