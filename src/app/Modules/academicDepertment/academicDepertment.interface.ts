import { Model, ObjectId } from 'mongoose'

export type IAcademicDepertment = {
  title: string
  academicFaculties: ObjectId
}

export type IAcademicDepertmentModel = Model<IAcademicDepertment, object>

export type IAcademicDepertmentFilter = {
  searchTerm?: string
}
