import React from "react"
import { Bell, GraduationCap } from "lucide-react"
import { StudentProfile } from "../../types/student"
import { ThemeSwitcher } from "../../theme/ThemeSwitcher"

export interface HeaderProps {
  student: StudentProfile
  activeTab: string
  onTabChange: (tab: string) => void
  unreadNotificationsCount?: number
}

export const Header: React.FC<HeaderProps> = ({
  student,
  unreadNotificationsCount = 3,
}) => {
  return (
    <header className="h-14 bg-[var(--kz-topbar-bg)] border-b border-[var(--kz-topbar-border)] flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 transition-colors shadow-xs">
      {/* Brand logo & portal title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-primary)] flex items-center justify-center text-white shadow-sm shadow-blue-500/30 font-bold shrink-0">
          <GraduationCap size={20} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm sm:text-base text-[var(--kz-topbar-text)] tracking-tight">
            Uni<span className="text-[var(--kz-brand-primary)]">Hub</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[var(--kz-topbar-muted)] bg-[var(--kz-surface-hover)] px-2 py-0.5 rounded-full border border-[var(--kz-border)]">
            Е-Деканат ХНУ
          </span>
        </div>
      </div>

      {/* Center Semester indicator */}
      <div className="hidden md:flex items-center gap-2 bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] rounded-full px-3 py-1 text-xs text-[var(--kz-topbar-text)]">
        <span className="w-2 h-2 rounded-full bg-[var(--kz-success)] animate-pulse" />
        <span className="font-medium">Весняний семестр 2025/2026</span>
        <span className="text-[var(--kz-topbar-muted)]">·</span>
        <span className="text-[var(--kz-topbar-muted)]">Тиждень 4 (Знаменник)</span>
      </div>

      {/* Right actions: ThemeSwitcher (Light/Dark/Cyberpunk), Notifications, Student profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Multi-Theme Switcher from UniVerse */}
        <ThemeSwitcher compact />

        {/* Notifications */}
        <button
          className="relative p-2 text-[var(--kz-topbar-muted)] hover:text-[var(--kz-topbar-text)] hover:bg-[var(--kz-surface-hover)] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[var(--kz-border)]"
          title="Сповіщення"
          aria-label="Сповіщення"
        >
          <Bell size={17} />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[var(--kz-danger)] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[var(--kz-topbar-bg)]">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User preview */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[var(--kz-border)]">
          <div className="w-8 h-8 rounded-full bg-[var(--kz-brand-light)] border border-[var(--kz-brand-primary)]/40 text-[var(--kz-brand-primary)] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0">
            РБ
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-[var(--kz-topbar-text)] leading-tight truncate max-w-[130px]">
              {student.name}
            </p>
            <p className="text-[10px] text-[var(--kz-topbar-muted)] leading-tight mt-0.5">
              {student.group} · {student.paymentType}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}