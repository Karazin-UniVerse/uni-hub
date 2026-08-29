export interface StudentProfile {
  id: string
  name: string
  avatarUrl?: string
  university: string
  faculty: string
  specialty: string
  specialtyCode: string
  degree: "Бакалавр" | "Магістр" | "Доктор філософії (PhD)"
  group: string
  course: number
  semester: number
  studyType: "Денна" | "Заочна" | "Дистанційна"
  paymentType: "Бюджет" | "Контракт"
  enrollmentOrder: string
  enrollmentDate: string
  duration: string
  endDate: string
  academicStatus: "Активний" | "Академвідпустка" | "Випускник"
  studentCardNumber: string
  recordBookNumber: string
  email: string
  ratingScore: number
  gpa?: number
  totalCredits: number
  completedCredits: number
}
