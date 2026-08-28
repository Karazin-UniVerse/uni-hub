import React from "react"
import { Award, BookOpen, ShieldCheck, Download } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { TranscriptItem } from "../../types/grades"

export interface TranscriptTableProps {
  items: TranscriptItem[]
}

export const TranscriptTable: React.FC<TranscriptTableProps> = ({ items }) => {
  const totalScore = items.reduce((s, i) => s + i.score, 0)
  const totalCredits = items.reduce((s, i) => s + i.credits, 0)
  const weightedGpa = (
    items.reduce((s, i) => s + i.score * i.credits, 0) / totalCredits
  ).toFixed(1)

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--kz-border)]">
        <div>
          <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
            Електронна залікова книжка (Академічна виписка)
          </h2>
          <p className="text-[11px] text-[var(--kz-text-secondary)]">
            Зведена відомість успішності за всі семестри
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[var(--kz-brand-light)] dark:bg-[rgba(0,82,204,0.15)] rounded-lg text-xs font-bold text-[var(--kz-brand-primary)] dark:text-[#60A5FA] font-mono">
            GPA: {weightedGpa} / 100
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] rounded-lg hover:bg-[var(--kz-surface-active)] cursor-pointer"
          >
            <Download size={13} />
            <span>Друк виписки</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[var(--kz-surface-hover)] border-b border-[var(--kz-border)] text-[var(--kz-text-secondary)]">
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center font-mono">
                Сем.
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">
                Навчальна дисципліна
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">
                Викладач
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center">
                Контроль
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center font-mono">
                Кредити
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center font-mono">
                Бал (100)
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center">
                ЄКТС
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--kz-border)]">
            {items.map((it) => (
              <tr
                key={it.id}
                className="hover:bg-[var(--kz-surface-hover)]/60 transition-colors"
              >
                <td className="py-3 px-3 text-center font-mono text-[var(--kz-text-muted)] font-semibold">
                  {it.semester}
                </td>
                <td className="py-3 px-3 font-semibold text-[var(--kz-text-primary)]">
                  {it.subject}
                </td>
                <td className="py-3 px-3 text-[var(--kz-text-secondary)] text-[11px]">
                  {it.instructor}
                </td>
                <td className="py-3 px-3 text-center text-[11px]">
                  <span className="bg-[var(--kz-surface-active)] px-1.5 py-0.5 rounded text-[var(--kz-text-secondary)]">
                    {it.controlType}
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-mono font-semibold text-[var(--kz-text-primary)]">
                  {it.credits}
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-[var(--kz-brand-primary)] dark:text-[#60A5FA]">
                  {it.score}
                </td>
                <td className="py-3 px-3 text-center">
                  <Badge
                    variant={it.ects === "A" ? "success" : "primary"}
                    size="sm"
                    className="font-mono"
                  >
                    {it.ects}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
