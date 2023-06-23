import { Schema, model } from 'mongoose'

import {
  IAcademicDepertment,
  IAcademicDepertmentModel,
} from './academicDepertment.interface'

const academicDepertmentSchema = new Schema<IAcademicDepertment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculties: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepertment = model<
  IAcademicDepertment,
  IAcademicDepertmentModel
>('AcademicDepertment', academicDepertmentSchema)
