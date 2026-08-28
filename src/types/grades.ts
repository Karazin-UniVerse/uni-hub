export type EctsGrade = "A" | "B" | "C" | "D" | "E" | "FX" | "F"

export interface TaskGrade {
  id: string
  task: string
  type: "Лабораторна" | "Практична" | "Контрольна" | "Самостійна" | "Курсова" | "Іспит" | "Залік"
  date: string
  maxScore: number
  grade: number
  comment?: string
}

export interface DisciplineGrades {
  id: string
  name: string
  code: string
  instructor: string
  department: string
  controlType: "Іспит" | "Залік" | "Диференційований залік"
  credits: number
  tasks: TaskGrade[]
}

export interface TranscriptItem {
  id: string
  semester: number
  subject: string
  instructor: string
  controlType: "Іспит" | "Залік" | "Диференційований залік"
  credits: number
  score: number
  ects: EctsGrade
  nationalGrade: "Відмінно" | "Добре" | "Задовільно" | "Зараховано" | "Незараховано"
}
