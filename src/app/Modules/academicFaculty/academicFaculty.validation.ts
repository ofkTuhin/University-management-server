import { z } from 'zod'

const createAcademicFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }),
  }),
})

const updateAcademicFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }).optional(),
  }),
})

export const AcademicFacultyZodValidation = {
  createAcademicFacultyZodValidation,
  updateAcademicFacultyZodValidation,
}
