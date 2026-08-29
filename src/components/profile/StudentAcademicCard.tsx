import React from "react"
import {
  Award,
  BookOpen,
  FileText,
  CheckCircle2,
  User,
  Building,
  Calendar,
  Hash,
} from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { StudentProfile } from "../../types/student"

export interface StudentAcademicCardProps {
  student: StudentProfile
  onOrderCertificate: () => void
}

export const StudentAcademicCard: React.FC<StudentAcademicCardProps> = ({
  student,
  onOrderCertificate,
}) => {
  const fields = [
    {
      label: "Заклад вищої освіти",
      value: student.university,
      icon: Building,
      fullWidth: true,
    },
    {
      label: "Факультет / Інститут",
      value: student.faculty,
      icon: Building,
      fullWidth: true,
    },
    { label: "Спеціальність", value: student.specialty, icon: BookOpen },
    { label: "Рівень вищої освіти", value: student.degree, icon: Award },
    { label: "Академічна група", value: student.group, icon: User },
    { label: "Форма навчання", value: student.studyType, icon: Calendar },
    {
      label: "Джерело фінансування",
      value: student.paymentType,
      icon: FileText,
    },
    {
      label: "Наказ про зарахування",
      value: student.enrollmentOrder,
      icon: Hash,
    },
    {
      label: "Номер студентського квитка",
      value: student.studentCardNumber,
      icon: Hash,
    },
    {
      label: "Номер залікової книжки",
      value: student.recordBookNumber,
      icon: Hash,
    },
    { label: "Тривалість навчання", value: student.duration, icon: Calendar },
    { label: "Планова дата випуску", value: student.endDate, icon: Calendar },
  ]

  return (
    <Card className="space-y-6">
      {/* Student header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--kz-border)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--kz-brand-primary)] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20 shrink-0">
            РБ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[var(--kz-text-primary)]">
                {student.name}
              </h2>
              <Badge variant="success" size="sm" dot>
                {student.academicStatus}
              </Badge>
            </div>
            <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5 font-mono">
              {student.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold bg-[var(--kz-brand-light)] text-[var(--kz-brand-primary)] px-2 py-0.5 rounded">
                Курс {student.course} · Семестр {student.semester}
              </span>
              <span className="text-[11px] font-semibold bg-[var(--kz-surface-hover)] text-[var(--kz-text-secondary)] px-2 py-0.5 rounded border border-[var(--kz-border)]">
                {student.group}
              </span>
              <span className="text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                <Award size={12} /> Стипендіальний бал: {student.ratingScore ?? student.gpa} / 100
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<FileText size={16} />}
          onClick={onOrderCertificate}
        >
          Замовити довідку ЕЦП
        </Button>
      </div>

      {/* Decanal Registry Details */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
          Офіційні дані деканату
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {fields.map((f, idx) => {
            const Icon = f.icon
            return (
              <div
                key={idx}
                className={`p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] ${
                  f.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
                  <Icon size={12} />
                  <span>{f.label}</span>
                </div>
                <p className="text-xs font-semibold text-[var(--kz-text-primary)] mt-1">
                  {f.value}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
