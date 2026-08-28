import React from "react"
import { DisciplineGrades } from "../../types/grades"
import { Card } from "../ui/Card"

export interface GradeDynamicChartProps {
  discipline: DisciplineGrades
}

export const GradeDynamicChart: React.FC<GradeDynamicChartProps> = ({
  discipline,
}) => {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
          Динаміка успішності за завданнями
        </h3>
        <span className="text-[11px] font-mono text-[var(--kz-text-muted)]">
          {discipline.tasks.length} оцінених робіт
        </span>
      </div>

      {/* SVG Bar chart */}
      <div className="h-28 flex items-end gap-2 pt-4 px-2 border-b border-[var(--kz-border)]">
        {discipline.tasks.map((task, idx) => {
          const ratio = task.grade / task.maxScore
          const heightPercent = Math.max(15, Math.round(ratio * 100))
          const isTop = ratio >= 0.9
          const barColor = isTop
            ? "bg-[var(--kz-success)]"
            : ratio >= 0.75
              ? "bg-[var(--kz-brand-primary)]"
              : ratio >= 0.6
                ? "bg-[var(--kz-warning)]"
                : "bg-[var(--kz-danger)]"

          return (
            <div
              key={task.id}
              className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
            >
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[var(--kz-sidebar-bg)] text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap pointer-events-none z-10 font-mono">
                {task.task}: {task.grade}/{task.maxScore} б.
              </div>

              {/* Bar */}
              <div
                className={`w-full rounded-t-[4px] transition-all duration-300 ${barColor}`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Label */}
              <span className="text-[9px] font-mono text-[var(--kz-text-muted)] mt-1 truncate max-w-full">
                №{idx + 1}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[var(--kz-text-secondary)] font-mono">
        <span>Мін: 60%</span>
        <span>
          Середній рейтинг:{" "}
          {Math.round(
            discipline.tasks.reduce(
              (a, b) => a + (b.grade / b.maxScore) * 100,
              0,
            ) / discipline.tasks.length,
          )}
          %
        </span>
        <span>Макс: 100%</span>
      </div>
    </Card>
  )
}
