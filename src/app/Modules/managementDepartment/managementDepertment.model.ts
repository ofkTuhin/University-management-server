import { Schema, model } from 'mongoose'

import {
  IManagementDepartment,
  IManagementDepartmentModel,
} from './managementDepertment.interface'

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const ManagementDepartment = model<
  IManagementDepartment,
  IManagementDepartmentModel
>('ManagementDepartment', managementDepartmentSchema)
