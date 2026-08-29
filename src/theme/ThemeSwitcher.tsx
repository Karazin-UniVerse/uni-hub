import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme, type AppTheme } from './ThemeContext';
import clsx from 'clsx';

const THEME_META: Record<AppTheme, { label: string; icon: React.ReactNode; color: string }> = {
  light: { label: 'Світла', icon: <Sun size={15} />, color: 'text-amber-500' },
  dark: { label: 'Темна', icon: <Moon size={15} />, color: 'text-blue-400' },
  cyberpunk: { label: 'Cyberpunk', icon: <Zap size={15} />, color: 'text-[#00F0FF]' },
};

export interface ThemeSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false, className }) => {
  const { theme, setTheme, cycleTheme } = useTheme();

  if (compact) {
    const meta = THEME_META[theme];
    return (
      <button
        type="button"
        onClick={cycleTheme}
        className={clsx(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--kz-surface-hover)] hover:bg-[var(--kz-surface-active)] text-[var(--kz-text-primary)] text-xs font-semibold transition-all cursor-pointer border border-[var(--kz-border)] shadow-xs select-none',
          className
        )}
        title={`Поточна тема: ${meta.label}. Натисніть для перемикання`}
        aria-label="Перемикач теми"
      >
        <span className={meta.color}>{meta.icon}</span>
        <span className="text-[11px] tracking-wide font-medium">{meta.label}</span>
      </button>
    );
  }

  return (
    <div
      className={clsx(
        'inline-flex items-center p-1 rounded-xl bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] gap-1',
        className
      )}
      role="group"
      aria-label="Вибір теми оформлення"
    >
      {(Object.keys(THEME_META) as AppTheme[]).map((key) => {
        const meta = THEME_META[key];
        const isActive = theme === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setTheme(key)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none',
              isActive
                ? 'bg-[var(--kz-surface)] text-[var(--kz-text-primary)] shadow-sm border border-[var(--kz-border)]'
                : 'text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)]'
            )}
            aria-pressed={isActive}
          >
            <span className={isActive ? meta.color : ''}>{meta.icon}</span>
            <span>{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
};