import React, { useMemo } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts"
import { DisciplineGrades } from "../../types/grades"
import { Card } from "../ui/Card"
import { useTheme } from "../../theme/ThemeContext"

export interface GradeDynamicChartProps {
  discipline: DisciplineGrades
}

export const GradeDynamicChart: React.FC<GradeDynamicChartProps> = ({
  discipline,
}) => {
  const { theme } = useTheme()

  const data = useMemo(() => {
    return discipline.tasks.map((task, idx) => ({
      name: `№${idx + 1}`,
      fullTask: task.task,
      grade: task.grade,
      maxScore: task.maxScore,
      percentage: Math.round((task.grade / task.maxScore) * 100),
    }))
  }, [discipline.tasks])

  const averagePercentage = useMemo(() => {
    if (data.length === 0) return 0
    return Math.round(data.reduce((acc, d) => acc + d.percentage, 0) / data.length)
  }, [data])

  const getBarColor = (percentage: number) => {
    if (theme === 'cyberpunk') {
      if (percentage >= 90) return '#00FF88'
      if (percentage >= 75) return '#00F0FF'
      if (percentage >= 60) return '#FFE600'
      return '#FF0055'
    }
    if (percentage >= 90) return 'var(--kz-success)'
    if (percentage >= 75) return 'var(--kz-brand-primary)'
    if (percentage >= 60) return 'var(--kz-warning)'
    return 'var(--kz-danger)'
  }

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
            Динаміка успішності за завданнями (Recharts)
          </h3>
          <p className="text-[11px] text-[var(--kz-text-secondary)]">
            Аналітика отриманих балів у співвідношенні до максимальних
          </p>
        </div>
        <span className="text-[11px] font-mono text-[var(--kz-text-muted)] bg-[var(--kz-surface-hover)] px-2 py-0.5 rounded border border-[var(--kz-border)]">
          {discipline.tasks.length} оцінених робіт
        </span>
      </div>

      {/* Interactive Recharts Component */}
      <div className="h-44 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--kz-border)" vertical={false} opacity={0.6} />
            <XAxis
              dataKey="name"
              stroke="var(--kz-text-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'var(--kz-border)' }}
            />
            <YAxis
              domain={[0, 100]}
              stroke="var(--kz-text-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'var(--kz-border)' }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: 'var(--kz-surface-hover)', opacity: 0.5 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload
                  return (
                    <div className="bg-[var(--kz-topbar-bg)] border border-[var(--kz-border)] p-2.5 rounded-lg shadow-lg text-xs font-mono space-y-1 z-50">
                      <p className="font-sans font-bold text-[var(--kz-text-primary)]">{d.fullTask}</p>
                      <p className="text-[var(--kz-text-secondary)]">
                        Оцінка: <b className="text-[var(--kz-brand-primary)] dark:text-[#60A5FA]">{d.grade}</b> / {d.maxScore} б.
                      </p>
                      <p className="text-[var(--kz-success-text)] font-semibold">
                        Результат: {d.percentage}%
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[var(--kz-text-secondary)] font-mono pt-2 border-t border-[var(--kz-border)]">
        <span>Мін. поріг: 60%</span>
        <span>
          Середній бал курсу:{" "}
          <b className="text-[var(--kz-brand-primary)] dark:text-[#60A5FA]">
            {averagePercentage}%
          </b>
        </span>
        <span>Макс: 100%</span>
      </div>
    </Card>
  )
}