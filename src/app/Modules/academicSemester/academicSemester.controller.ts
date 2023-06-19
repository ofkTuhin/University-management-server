import { Request, Response } from 'express'
import { paginationField } from '../../../constants/pagination'
import catchAsync from '../../../share/catchAsync'
import pick from '../../../share/pick'
import { sendResponse } from '../../../share/sendResponse'
import { IAcademiSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

const createaSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...acdemicSemesterData } = req.body
  const academicSemester = await AcademicSemesterService.createAcademicSemester(
    acdemicSemesterData
  )
  // res.status(200).json({
  //   success: true,
  //   message: 'semester created successfully',
  //   result: academicSemester,
  // })
  sendResponse<IAcademiSemester>(res, {
    success: true,
    message: 'semester created successfully',
    result: academicSemester,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationoptions = pick(req.query, paginationField)
  const allSemesters = await AcademicSemesterService.getAllSemesters(
    paginationoptions
  )

  sendResponse<IAcademiSemester[]>(res, {
    success: true,
    message: 'all semesters fetched successfully',
    result: allSemesters.data,
    meta: allSemesters.meta,
  })
})

export const academicSemesterController = {
  createaSemester,
  getAllSemesters,
}
