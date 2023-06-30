import { z } from 'zod'

const createAcademicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }),
    academicFaculties: z.string({ required_error: 'Year is required' }),
  }),
})

const updateAcademicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }).optional(),
  }),
})

export const AcademicDepartmentZodValidation = {
  createAcademicDepartmentZodValidation,
  updateAcademicDepartmentZodValidation,
}
