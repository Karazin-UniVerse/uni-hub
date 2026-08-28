import React from "react"
import { Bell, Moon, Sun, Search, LogOut, GraduationCap } from "lucide-react"
import { StudentProfile } from "../../types/student"

export interface HeaderProps {
  student: StudentProfile
  activeTab: string
  onTabChange: (tab: string) => void
  isDark: boolean
  onToggleTheme: () => void
  unreadNotificationsCount?: number
}

export const Header: React.FC<HeaderProps> = ({
  student,
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  unreadNotificationsCount = 3,
}) => {
  return (
    <header className="h-14 bg-[var(--kz-sidebar-bg)] border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
      {/* Brand logo & portal title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-primary)] flex items-center justify-center text-white shadow-sm shadow-blue-500/30 font-bold">
          <GraduationCap size={20} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
            Uni<span className="text-[var(--kz-brand-primary)]">Hub</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            Е-Деканат ХНУ
          </span>
        </div>
      </div>

      {/* Center Semester indicator & quick search */}
      <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/80">
        <span className="w-2 h-2 rounded-full bg-[var(--kz-success)] animate-pulse" />
        <span className="font-medium">Весняний семестр 2025/2026</span>
        <span className="text-white/40">·</span>
        <span className="text-white/60">Тиждень 4 (Знаменник)</span>
      </div>

      {/* Right actions: Theme toggle, Notifications, Student profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          title={isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
          aria-label="Перемикач теми"
        >
          {isDark ? (
            <Sun size={17} className="text-amber-400" />
          ) : (
            <Moon size={17} />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          title="Сповіщення"
          aria-label="Сповіщення"
        >
          <Bell size={17} />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[var(--kz-danger)] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[var(--kz-sidebar-bg)]">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User preview */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-[var(--kz-brand-primary)]/20 border border-[var(--kz-brand-primary)]/50 text-[var(--kz-brand-primary)] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0">
            РБ
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
              {student.name}
            </p>
            <p className="text-[10px] text-white/50 leading-tight mt-0.5">
              {student.group} · 2 курс
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
