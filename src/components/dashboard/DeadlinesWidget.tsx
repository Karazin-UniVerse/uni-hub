import React, { useMemo } from "react"
import { Clock, Calendar } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { useAuth } from "../../context/AuthContext"

export interface DeadlineItem {
  id: string
  title: string
  course: string
  deadline: string
  urgency: "high" | "medium" | "normal"
  remainingText: string
  url?: string
}

export const MOCK_DEADLINES: DeadlineItem[] = [
  {
    id: "d1",
    title: "ЛР №4: Багатопотоковість та IPC (mmap, mutex)",
    course: "Об’єктно-орієнтоване програмування",
    deadline: "02.09.2024, 23:59",
    urgency: "high",
    remainingText: "2 дні 4 год",
  },
  {
    id: "d2",
    title: "Курсова робота: Модульна платформа (Звіт ч. 2)",
    course: "Бази даних та ІС",
    deadline: "08.09.2024, 18:00",
    urgency: "medium",
    remainingText: "8 днів",
  },
  {
    id: "d3",
    title: "ЛР №3: Аналіз та налаштування CNAME Flattening",
    course: "Комп’ютерні мережі",
    deadline: "12.09.2024, 23:59",
    urgency: "normal",
    remainingText: "12 днів",
  },
]

export const DeadlinesWidget: React.FC = () => {
  const { isLoggedIn, assignments, courses } = useAuth()

  const deadlines: DeadlineItem[] = useMemo(() => {
    if (isLoggedIn && assignments.length > 0) {
      const now = Date.now()
      const courseMap = new Map(courses.map((c) => [c.id, c.fullname]))

      return assignments
        .filter((a) => a.duedate && a.duedate > 0)
        .sort((a, b) => a.duedate - b.duedate)
        .slice(0, 5)
        .map((a) => {
          const dueDateMs = a.duedate * 1000
          const diffMs = dueDateMs - now
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
          const diffHours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          )

          let urgency: "high" | "medium" | "normal" = "normal"
          let remainingText = `${diffDays} днів`

          if (diffMs <= 0) {
            urgency = "high"
            remainingText = "Термін минув"
          } else if (diffDays < 3) {
            urgency = "high"
            remainingText =
              diffDays === 0
                ? `${diffHours} год`
                : `${diffDays} дн ${diffHours} год`
          } else if (diffDays < 7) {
            urgency = "medium"
            remainingText = `${diffDays} днів`
          }

          const formattedDate = new Date(dueDateMs).toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })

          return {
            id: String(a.id),
            title: a.name,
            course: courseMap.get(a.course) || "Moodle курс",
            deadline: formattedDate,
            urgency,
            remainingText,
            url: `https://moodle.karazin.ua/mod/assign/view.php?id=${a.cmid}`,
          }
        })
    }
    return MOCK_DEADLINES
  }, [isLoggedIn, assignments, courses])

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)] mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[var(--kz-brand-primary)]" />
          <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
            Гарячі дедлайни
          </h2>
        </div>
        <Badge variant="primary" size="sm">
          {deadlines.length} {deadlines.length === 1 ? "завдання" : "завдань"}
        </Badge>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto">
        {deadlines.map((d) => {
          const badgeVariant =
            d.urgency === "high"
              ? "danger"
              : d.urgency === "medium"
                ? "warning"
                : "info"

          return (
            <div
              key={d.id}
              className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] hover:border-[var(--kz-brand-primary)]/40 transition-colors flex flex-col justify-between gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--kz-text-primary)] truncate">
                    {d.title}
                  </p>
                  <p className="text-[11px] text-[var(--kz-text-secondary)] mt-0.5 truncate">
                    {d.course}
                  </p>
                </div>
                <Badge variant={badgeVariant} size="sm">
                  {d.remainingText}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[var(--kz-text-muted)] pt-1 border-t border-[var(--kz-border)]/50">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar size={11} />
                  <span>{d.deadline}</span>
                </span>
                <a
                  href={
                    d.url ||
                    "https://moodle.karazin.ua"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--kz-brand-primary)] font-semibold hover:underline cursor-pointer"
                >
                  Здати в Moodle →
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
