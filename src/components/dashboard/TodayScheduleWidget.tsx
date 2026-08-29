import React, { useMemo } from "react"
import { Calendar, Video, ArrowUpRight, Clock } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { useAuth } from "../../context/AuthContext"

export const TodayScheduleWidget: React.FC = () => {
  const { isLoggedIn, events } = useAuth()

  const liveEvents = useMemo(() => {
    if (isLoggedIn && events.length > 0) {
      return events.slice(0, 3).map((ev) => {
        const date = new Date(ev.timestart * 1000)
        const timeStr = date.toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        })
        return {
          id: ev.id,
          name: ev.name,
          time: timeStr,
          description: ev.description || "Подія в Moodle",
        }
      })
    }
    return null
  }, [isLoggedIn, events])

  return (
    <Card className="flex flex-col h-full border-[var(--kz-border)]">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)] mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
            Сьогодні в розкладі
          </h2>
        </div>
        <Badge variant="primary" size="sm">
          {liveEvents ? `${liveEvents.length} події Moodle` : "Понеділок (3 пари)"}
        </Badge>
      </div>

      {/* Active lesson hero */}
      <div className="p-3.5 rounded-[var(--kz-radius-lg)] bg-[var(--kz-brand-primary)] text-white shadow-sm shadow-blue-500/20 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            Зараз іде пара
          </span>
          <span className="text-xs font-mono font-medium text-white/90">
            08:30 – 10:05
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold leading-tight">
            Алгоритми та структури даних
          </h3>
          <p className="text-xs text-white/80 mt-0.5">
            Лекція · доц. Руккас К. М.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white/20">
          <span className="text-[11px] text-white/80 flex items-center gap-1">
            <Video size={13} />
            <span>Zoom Conference</span>
          </span>
          <a
            href="https://zoom.us/j/karazin-cs-algo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[var(--kz-brand-primary)] hover:bg-white/90 rounded-md text-xs font-bold transition-all shadow-xs"
          >
            <span>Увійти в Zoom</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Next lessons or live Moodle events */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
          {liveEvents ? "Події календаря Moodle:" : "Наступні заняття:"}
        </p>

        {liveEvents && liveEvents.length > 0 ? (
          liveEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] flex items-center justify-between text-xs"
            >
              <div className="min-w-0 pr-2">
                <p className="font-semibold text-[var(--kz-text-primary)] truncate">
                  {ev.name}
                </p>
                <p className="text-[11px] text-[var(--kz-text-secondary)] truncate">
                  Календар Moodle
                </p>
              </div>
              <span className="font-mono font-bold text-[var(--kz-text-secondary)] shrink-0 flex items-center gap-1">
                <Clock size={11} />
                {ev.time}
              </span>
            </div>
          ))
        ) : (
          <>
            <div className="p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[var(--kz-text-primary)]">
                  Алгоритми (Лабораторне)
                </p>
                <p className="text-[11px] text-[var(--kz-text-secondary)]">
                  Комп’ютерний клас 4-12
                </p>
              </div>
              <span className="font-mono font-bold text-[var(--kz-text-secondary)]">
                10:15 – 11:50
              </span>
            </div>

            <div className="p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[var(--kz-text-primary)]">
                  Бази даних та ІС (Практичне)
                </p>
                <p className="text-[11px] text-[var(--kz-text-secondary)]">
                  Google Meet
                </p>
              </div>
              <span className="font-mono font-bold text-[var(--kz-text-secondary)]">
                12:10 – 13:45
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
