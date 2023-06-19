import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { sendResponse } from '../../../share/sendResponse'
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
  sendResponse(res, {
    success: true,
    message: 'semester created successfully',
    result: academicSemester,
  })
})

export default {
  createaSemester,
}
