import { Model, Types } from 'mongoose'

import { IAcademicDepartment } from '../academicDepertment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IFaculty = {
  id: string
  name: UserName //embedded object
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  academicFaculty: Types.ObjectId | IAcademicFaculty // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment // // reference _id
  designation: string
  profileImage?: string
}

export type IFacultyModel = Model<IFaculty>

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
