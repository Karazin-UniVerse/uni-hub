import React from "react"
import { Award, CheckCircle2, BookOpen, Clock } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { StudentProfile } from "../../types/student"

export interface WelcomeBannerProps {
  student: StudentProfile
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ student }) => {
  const hour = new Date().getHours()
  const greeting =
    hour < 5
      ? "Доброї ночі"
      : hour < 12
        ? "Доброго ранку"
        : hour < 18
          ? "Доброго дня"
          : "Доброго вечора"

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-[var(--kz-surface)] via-[var(--kz-surface)] to-[var(--kz-brand-light)] dark:to-[rgba(0,82,204,0.12)] border-[var(--kz-border)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left student identity */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--kz-brand-primary)] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20 shrink-0">
            РБ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--kz-brand-primary)] dark:text-[#60A5FA] uppercase tracking-wider">
                {greeting},
              </span>
              <Badge variant="primary" size="sm">
                {student.group}
              </Badge>
              <Badge variant="success" size="sm" dot>
                {student.academicStatus}
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--kz-text-primary)] mt-0.5">
              {student.name}
            </h1>
            <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5">
              {student.faculty} · Спеціальність {student.specialty}
            </p>
          </div>
        </div>

        {/* Right Academic KPI Chips */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap md:flex-nowrap shrink-0">
          <div className="px-3.5 py-2 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] text-left min-w-[90px]">
            <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider flex items-center gap-1">
              <Award size={12} className="text-amber-500" />
              <span>Середній бал</span>
            </p>
            <p className="text-lg font-black text-[var(--kz-brand-primary)] dark:text-[#60A5FA] mt-0.5">
              {student.gpa}{" "}
              <span className="text-xs font-bold text-[var(--kz-success)]">
                (A)
              </span>
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] text-left min-w-[90px]">
            <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider flex items-center gap-1">
              <BookOpen size={12} className="text-blue-500" />
              <span>Кредити ЄКТС</span>
            </p>
            <p className="text-lg font-black text-[var(--kz-text-primary)] mt-0.5">
              {student.completedCredits}{" "}
              <span className="text-xs font-normal text-[var(--kz-text-muted)]">
                / {student.totalCredits}
              </span>
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-[var(--kz-radius-md)] bg-[var(--kz-success-bg)] border border-[var(--kz-success-border)] text-left min-w-[90px]">
            <p className="text-[10px] font-bold text-[var(--kz-success-text)] uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[var(--kz-success)]" />
              <span>Сесія</span>
            </p>
            <p className="text-sm font-bold text-[var(--kz-success-text)] mt-1">
              Допуск надано
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
