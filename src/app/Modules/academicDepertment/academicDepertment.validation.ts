import { z } from 'zod'

const createAcademicDepertmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }),
    academicFaculties: z.string({ required_error: 'Year is required' }),
  }),
})

const updateAcademicDepertmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Year is required' }).optional(),
  }),
})

export const AcademicDepertmentZodValidation = {
  createAcademicDepertmentZodValidation,
  updateAcademicDepertmentZodValidation,
}
