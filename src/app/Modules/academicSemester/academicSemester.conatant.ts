import {
  IAcademicSemesterCode,
  IAcademicSemesterMonths,
  IAcademicSemesterTitle,
} from './academicSemester.interface'

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03']
export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const academicSemesterTitleCode: { [key: string]: string } = {
  Automn: '01',
  Summer: '02',
  Fall: '03',
}
