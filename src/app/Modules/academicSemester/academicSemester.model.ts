import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.conatant'
import { IAcademiSemester, IAcademicModel } from './academicSemester.interface'

const academicSemesterSchema = new Schema<IAcademiSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },

    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exist')
  }

  next()
})
export const AcademicSemester = model<IAcademiSemester, IAcademicModel>(
  'AcademicSemester',
  academicSemesterSchema
)
