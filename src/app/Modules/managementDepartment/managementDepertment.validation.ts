import { z } from 'zod'

const createManagementDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }),
  }),
})

const updateManagementDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }).optional(),
  }),
})

export const ManagementDepartmentZodValidation = {
  createManagementDepartmentZodValidation,
  updateManagementDepartmentZodValidation,
}
