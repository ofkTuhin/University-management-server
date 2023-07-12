import { Model } from 'mongoose'

export type IAcademicSemester = {
  title: IAcademicSemesterTitle
  year: string
  code: IAcademicSemesterCode
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterMonths =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec'
export type IAcademicSemesterCode = '01' | '02' | '03'

export type IAcademicModel = Model<IAcademicSemester, object>

export type IAcademicSemesterFilter = {
  searchTerm?: string
}
