export interface LessonSlot {
  id: string
  timeStart: string
  timeEnd: string
  timeRange: string
  subject: string
  type: "Лекція" | "Практичне" | "Лабораторне" | "Семінар" | "Консультація"
  instructor: string
  room: string
  isOnline: boolean
  onlineLink?: string
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat"
  weekType: "all" | "numerator" | "denominator"
}

export interface DaySchedule {
  dayKey: "mon" | "tue" | "wed" | "thu" | "fri" | "sat"
  dayName: string
  shortName: string
  lessons: LessonSlot[]
}
