import React from "react"
import clsx from "clsx"
import { BookOpen, User, Building2 } from "lucide-react"
import { DisciplineGrades } from "../../types/grades"

export interface DisciplineSelectorProps {
  disciplines: DisciplineGrades[]
  selectedId: string
  onSelect: (id: string) => void
}

export const DisciplineSelector: React.FC<DisciplineSelectorProps> = ({
  disciplines,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider px-1">
        Дисципліни 4-го семестру ({disciplines.length})
      </p>

      <div className="space-y-1.5">
        {disciplines.map((d) => {
          const isSelected = d.id === selectedId
          const currentTotal = d.tasks.reduce((sum, t) => sum + t.grade, 0)

          return (
            <button
              key={d.id}
              onClick={() => onSelect(d.id)}
              className={clsx(
                "w-full text-left p-3 rounded-[var(--kz-radius-md)] border transition-all cursor-pointer select-none",
                isSelected
                  ? "bg-[var(--kz-brand-light)] dark:bg-[rgba(0,82,204,0.18)] border-[var(--kz-brand-primary)] shadow-sm"
                  : "bg-[var(--kz-surface)] border-[var(--kz-border)] hover:bg-[var(--kz-surface-hover)]",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p
                  className={clsx(
                    "text-xs font-bold leading-snug",
                    isSelected
                      ? "text-[var(--kz-brand-primary)] dark:text-[#60A5FA]"
                      : "text-[var(--kz-text-primary)]",
                  )}
                >
                  {d.name}
                </p>
                <span className="text-[11px] font-mono font-bold text-[var(--kz-brand-primary)] dark:text-[#60A5FA] shrink-0">
                  {currentTotal} б.
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--kz-text-secondary)]">
                <span className="flex items-center gap-1 truncate">
                  <User size={11} className="shrink-0" />
                  <span className="truncate">{d.instructor}</span>
                </span>
                <span className="font-semibold shrink-0 bg-[var(--kz-surface-active)] px-1.5 py-0.5 rounded">
                  {d.credits} ЄКТС
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
