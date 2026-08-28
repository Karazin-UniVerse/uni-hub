import React from "react"
import { TaskGrade } from "../../types/grades"
import { Badge } from "../ui/Badge"

export interface GradesTableProps {
  tasks: TaskGrade[]
  disciplineName: string
}

export const GradesTable: React.FC<GradesTableProps> = ({
  tasks,
  disciplineName,
}) => {
  const totalScore = tasks.reduce((sum, t) => sum + t.grade, 0)
  const totalMax = tasks.reduce((sum, t) => sum + t.maxScore, 0)
  const percentage = Math.round((totalScore / totalMax) * 100)

  const getEcts = (p: number) => {
    if (p >= 90)
      return { ects: "A", national: "Відмінно", variant: "success" as const }
    if (p >= 82)
      return { ects: "B", national: "Добре", variant: "primary" as const }
    if (p >= 75)
      return { ects: "C", national: "Добре", variant: "info" as const }
    if (p >= 64)
      return { ects: "D", national: "Задовільно", variant: "warning" as const }
    if (p >= 60)
      return { ects: "E", national: "Задовільно", variant: "warning" as const }
    if (p >= 35)
      return {
        ects: "FX",
        national: "Незараховано (можливе перескладання)",
        variant: "danger" as const,
      }
    return {
      ects: "F",
      national: "Незараховано (повторний курс)",
      variant: "danger" as const,
    }
  }

  const standing = getEcts(percentage)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[var(--kz-surface-hover)] border-b border-[var(--kz-border)] text-[var(--kz-text-secondary)]">
            <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px]">
              Назва завдання / Заходу контролю
            </th>
            <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px] text-center">
              Тип
            </th>
            <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px] text-center font-mono">
              Дата
            </th>
            <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px] text-center font-mono">
              Макс.
            </th>
            <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-right font-mono">
              Оцінка
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--kz-border)]">
          {tasks.map((t) => {
            const isTop = t.grade >= t.maxScore * 0.9
            return (
              <tr
                key={t.id}
                className="hover:bg-[var(--kz-surface-hover)]/60 transition-colors"
              >
                <td className="py-3 px-4 text-[var(--kz-text-primary)] font-semibold">
                  <div>{t.task}</div>
                  {t.comment && (
                    <div className="text-[11px] font-normal text-[var(--kz-text-muted)] mt-0.5 italic">
                      💬 «{t.comment}»
                    </div>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded bg-[var(--kz-surface-active)] text-[10px] font-medium text-[var(--kz-text-secondary)]">
                    {t.type}
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-mono text-[var(--kz-text-muted)]">
                  {t.date}
                </td>
                <td className="py-3 px-3 text-center font-mono text-[var(--kz-text-muted)]">
                  {t.maxScore}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold">
                  <span
                    className={
                      isTop
                        ? "text-[var(--kz-success)]"
                        : t.grade < t.maxScore * 0.6
                          ? "text-[var(--kz-danger)]"
                          : "text-[var(--kz-text-primary)]"
                    }
                  >
                    {t.grade}
                  </span>
                  <span className="text-[var(--kz-text-muted)] font-normal text-[10px]">
                    {" "}
                    / {t.maxScore}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="bg-[var(--kz-surface-hover)] border-t-2 border-[var(--kz-border-strong)] font-bold">
            <td
              colSpan={3}
              className="py-3.5 px-4 text-sm text-[var(--kz-text-primary)]"
            >
              Підсумковий поточний бал з дисципліни
            </td>
            <td className="py-3.5 px-3 text-center font-mono text-xs text-[var(--kz-text-secondary)]">
              {totalMax}
            </td>
            <td className="py-3.5 px-4 text-right font-mono">
              <div className="flex items-center justify-end gap-2">
                <span className="text-base text-[var(--kz-brand-primary)] dark:text-[#60A5FA]">
                  {totalScore}
                </span>
                <Badge variant={standing.variant} size="md">
                  {standing.ects} ({percentage}%)
                </Badge>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
