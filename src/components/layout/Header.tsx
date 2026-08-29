import React from 'react';
import { Bell, GraduationCap, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../../types/student';
import { ThemeSwitcher } from '../../theme/ThemeSwitcher';
import { useAuth } from '../../context/AuthContext';

export interface HeaderProps {
  student: StudentProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenLogin: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  onOpenLogin,
  unreadNotificationsCount = 3,
}) => {
  const { user, isLoggedIn, logout, notifications } = useAuth();
  const liveUnreadCount = isLoggedIn
    ? notifications.filter((n) => !n.read).length
    : unreadNotificationsCount;

  return (
    <header className="h-14 bg-[var(--kz-topbar-bg)] border-b border-[var(--kz-topbar-border)] flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 transition-colors shadow-xs">
      {/* Brand logo & portal title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-primary)] flex items-center justify-center text-white shadow-sm font-bold shrink-0">
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

      {/* Center Semester indicator & Moodle sync state */}
      <div className="hidden md:flex items-center gap-2 bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] rounded-full px-3 py-1 text-xs text-[var(--kz-topbar-text)]">
        {isLoggedIn ? (
          <>
            <span className="w-2 h-2 rounded-full bg-[var(--kz-success)] animate-pulse" />
            <span className="font-medium text-[var(--kz-success)] flex items-center gap-1">
              <CheckCircle2 size={12} /> Moodle Live
            </span>
            <span className="text-[var(--kz-topbar-muted)]">·</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-[var(--kz-success)]" />
          </>
        )}
        <span className="font-medium">Весняний семестр 2025/2026</span>
        <span className="text-[var(--kz-topbar-muted)]">·</span>
        <span className="text-[var(--kz-topbar-muted)]">Тиждень 4 (Знаменник)</span>
      </div>

      {/* Right actions: ThemeSwitcher (Light/Dark/Cyberpunk), Notifications, Student profile / Auth */}
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
          {liveUnreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[var(--kz-danger)] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[var(--kz-topbar-bg)]">
              {liveUnreadCount}
            </span>
          )}
        </button>

        {/* User profile / Login button */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[var(--kz-border)]">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--kz-brand-light)] border border-[var(--kz-brand-primary)]/40 text-[var(--kz-brand-primary)] flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'РБ'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[var(--kz-topbar-text)] leading-tight truncate max-w-[130px]">
                  {user?.name || student.name}
                </p>
                <p className="text-[10px] text-[var(--kz-topbar-muted)] leading-tight mt-0.5 truncate max-w-[130px]">
                  {user?.email || student.group}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-[var(--kz-text-muted)] hover:text-[var(--kz-danger)] hover:bg-[var(--kz-danger)]/10 rounded-lg transition-colors cursor-pointer"
                title="Вийти з акаунта"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--kz-brand-primary)] hover:bg-[var(--kz-brand-secondary)] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <LogIn size={14} />
              <span>Увійти</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
