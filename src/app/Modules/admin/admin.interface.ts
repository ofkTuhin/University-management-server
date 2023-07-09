import { Model, Types } from 'mongoose'

import { IManagementDepartment } from '../managementDepartment/managementDepertment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IManagementDepartment // // reference _id
  designation: string
  profileImage?: string
}

export type IAdminModel = Model<IAdmin>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
