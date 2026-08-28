import React, { useState } from "react"
import clsx from "clsx"
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  ExternalLink,
  Filter,
} from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { DaySchedule, LessonSlot } from "../../types/schedule"

export interface ScheduleWeekMatrixProps {
  schedule: DaySchedule[]
}

export const ScheduleWeekMatrix: React.FC<ScheduleWeekMatrixProps> = ({
  schedule,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [weekType, setWeekType] = useState<"numerator" | "denominator">(
    "denominator",
  )

  const filteredSchedule =
    selectedDay === "all"
      ? schedule
      : schedule.filter((d) => d.dayKey === selectedDay)

  return (
    <div className="space-y-4">
      {/* Header controls: Day filter pills & Numerator/Denominator switch */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
        {/* Day selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedDay("all")}
            className={clsx(
              "px-3 py-1.5 rounded-[var(--kz-radius-md)] text-xs font-semibold transition-all cursor-pointer shrink-0",
              selectedDay === "all"
                ? "bg-[var(--kz-brand-primary)] text-white shadow-xs"
                : "bg-[var(--kz-surface-hover)] text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)]",
            )}
          >
            Весь тиждень
          </button>
          {schedule.map((d) => (
            <button
              key={d.dayKey}
              onClick={() => setSelectedDay(d.dayKey)}
              className={clsx(
                "px-3 py-1.5 rounded-[var(--kz-radius-md)] text-xs font-semibold transition-all cursor-pointer shrink-0",
                selectedDay === d.dayKey
                  ? "bg-[var(--kz-brand-primary)] text-white shadow-xs"
                  : "bg-[var(--kz-surface-hover)] text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)]",
              )}
            >
              {d.dayName}
            </button>
          ))}
        </div>

        {/* Week Numerator / Denominator toggle */}
        <div className="flex items-center gap-1.5 bg-[var(--kz-surface-hover)] p-1 rounded-[var(--kz-radius-md)] border border-[var(--kz-border)] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setWeekType("numerator")}
            className={clsx(
              "px-2.5 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer",
              weekType === "numerator"
                ? "bg-[var(--kz-surface)] text-[var(--kz-brand-primary)] shadow-xs"
                : "text-[var(--kz-text-muted)] hover:text-[var(--kz-text-primary)]",
            )}
          >
            Чисельник
          </button>
          <button
            onClick={() => setWeekType("denominator")}
            className={clsx(
              "px-2.5 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer",
              weekType === "denominator"
                ? "bg-[var(--kz-surface)] text-[var(--kz-brand-primary)] shadow-xs"
                : "text-[var(--kz-text-muted)] hover:text-[var(--kz-text-primary)]",
            )}
          >
            Знаменник (Поточний)
          </button>
        </div>
      </Card>

      {/* Days grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((day) => (
          <Card key={day.dayKey} className="flex flex-col h-full space-y-3">
            {/* Day Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[var(--kz-border)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--kz-brand-primary)]" />
                <h3 className="text-sm font-bold text-[var(--kz-text-primary)]">
                  {day.dayName}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[var(--kz-text-muted)]">
                {day.lessons.length} пари
              </span>
            </div>

            {/* Lessons list */}
            <div className="space-y-2.5 flex-1">
              {day.lessons.map((lesson) => {
                const typeBadgeVariant =
                  lesson.type === "Лекція"
                    ? "primary"
                    : lesson.type === "Лабораторне"
                      ? "warning"
                      : "success"

                return (
                  <div
                    key={lesson.id}
                    className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] hover:border-[var(--kz-brand-primary)]/40 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-[var(--kz-text-primary)]">
                        {lesson.timeRange}
                      </span>
                      <Badge variant={typeBadgeVariant} size="sm">
                        {lesson.type}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[var(--kz-text-primary)] leading-snug">
                        {lesson.subject}
                      </h4>
                      <p className="text-[11px] text-[var(--kz-text-secondary)] mt-0.5 flex items-center gap-1">
                        <User size={11} className="shrink-0" />
                        <span>{lesson.instructor}</span>
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[var(--kz-border)]/50 text-[11px]">
                      <span className="text-[var(--kz-text-muted)] flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin size={11} className="shrink-0" />
                        <span className="truncate">{lesson.room}</span>
                      </span>

                      {lesson.isOnline && lesson.onlineLink && (
                        <a
                          href={lesson.onlineLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--kz-brand-primary)] dark:text-[#60A5FA] font-semibold hover:underline"
                        >
                          <Video size={11} />
                          <span>Онлайн</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
