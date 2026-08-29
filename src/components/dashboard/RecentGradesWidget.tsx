import React, { useMemo } from "react"
import { Award, ChevronRight } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { ProgressBar } from "../ui/ProgressBar"
import { useAuth } from "../../context/AuthContext"

export interface RecentGradeItem {
  subject: string
  task: string
  score: number
  max: number
  ects: string
  date: string
}

export const MOCK_RECENT_GRADES: RecentGradeItem[] = [
  {
    subject: "Алгоритми та структури даних",
    task: "ЛР №1: Динамічні масиви",
    score: 10,
    max: 10,
    ects: "A",
    date: "12.09.2024",
  },
  {
    subject: "Об’єктно-орієнтоване прогр.",
    task: "Курсова робота (ч. 1)",
    score: 29,
    max: 30,
    ects: "A",
    date: "10.09.2024",
  },
  {
    subject: "Бази даних та ІС",
    task: "ЛР №2: Складні SQL-запити",
    score: 10,
    max: 10,
    ects: "A",
    date: "08.09.2024",
  },
  {
    subject: "Комп’ютерні мережі",
    task: "ЛР №1: Аналіз у Wireshark",
    score: 9.5,
    max: 10,
    ects: "A",
    date: "05.09.2024",
  },
]

export const RecentGradesWidget: React.FC<{ onOpenGrades: () => void }> = ({
  onOpenGrades,
}) => {
  const { isLoggedIn, grades, courses } = useAuth()

  const items: RecentGradeItem[] = useMemo(() => {
    if (isLoggedIn && (grades.length > 0 || courses.length > 0)) {
      const courseMap = new Map(courses.map((c) => [c.id, c.fullname]))

      const liveList: RecentGradeItem[] = grades
        .filter((g) => g.grade && g.grade.trim() !== "" && g.grade !== "-")
        .map((g) => {
          // Clean localized comma decimals e.g. "85,50" -> 85.5
          const normalized = String(g.grade).replace(",", ".")
          const parsed = parseFloat(normalized)
          if (isNaN(parsed) || !isFinite(parsed)) return null

          const score = Math.max(0, Math.min(100, parsed))
          let ects = "A"
          if (score < 60) ects = "Fx"
          else if (score < 64) ects = "E"
          else if (score < 74) ects = "D"
          else if (score < 82) ects = "C"
          else if (score < 90) ects = "B"

          return {
            subject: courseMap.get(g.courseid) || `Курс #${g.courseid}`,
            task: "Поточний рейтинг (Moodle)",
            score: Math.round(score * 10) / 10,
            max: 100,
            ects,
            date: "Синхронізовано",
          }
        })
        .filter((item): item is RecentGradeItem => item !== null)

      if (liveList.length > 0) {
        return liveList.slice(0, 4)
      }
    }
    return MOCK_RECENT_GRADES
  }, [isLoggedIn, grades, courses])

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)] mb-3">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-amber-500" />
          <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
            Останні оцінки
          </h2>
        </div>
        <button
          onClick={onOpenGrades}
          className="text-xs text-[var(--kz-brand-primary)] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
        >
          <span>Всі оцінки</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {items.map((g, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[var(--kz-text-primary)] truncate">
                  {g.subject}
                </p>
                <p className="text-[11px] text-[var(--kz-text-secondary)] truncate">
                  {g.task}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[var(--kz-text-primary)] font-mono">
                  {g.score} / {g.max}
                </span>
                <Badge variant="success" size="sm" className="ml-1.5 font-mono">
                  {g.ects}
                </Badge>
              </div>
            </div>
            <ProgressBar
              value={g.score}
              max={g.max}
              height="sm"
              colorVariant="primary"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
