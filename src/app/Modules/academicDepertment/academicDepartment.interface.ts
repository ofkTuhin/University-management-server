import { Model, ObjectId } from 'mongoose'

export type IAcademicDepartment = {
  title: string
  academicFaculties: ObjectId
}

export type IAcademicDepartmentModel = Model<IAcademicDepartment, object>

export type IAcademicDepartmentFilter = {
  searchTerm?: string
}
