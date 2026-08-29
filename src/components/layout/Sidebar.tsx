import React from "react"
import clsx from "clsx"
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  UserCheck,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"

export interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  badge?: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Головна", icon: LayoutDashboard },
  {
    id: "grades",
    label: "Оцінки та дисципліни",
    icon: GraduationCap,
    badge: "93.4",
  },
  { id: "schedule", label: "Розклад занять", icon: Calendar },
  { id: "finances", label: "Оплата та реквізити", icon: CreditCard },
  { id: "profile", label: "Профіль та заліковка", icon: UserCheck },
]

export interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="hidden md:flex w-64 bg-[var(--kz-sidebar-bg)] flex-col shrink-0 border-r border-[var(--kz-sidebar-border)] select-none transition-colors">
      {/* Navigation items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold text-[var(--kz-sidebar-text-muted)] uppercase tracking-wider">
          Розділи кабінету
        </p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-[var(--kz-radius-md)] text-xs font-semibold transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-[var(--kz-brand-primary)] text-white shadow-sm shadow-blue-500/20"
                  : "text-[var(--kz-sidebar-text)] hover:bg-[var(--kz-sidebar-hover)] hover:text-[var(--kz-sidebar-text-hover)]",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={clsx(
                    isActive ? "text-white" : "text-[var(--kz-sidebar-text-muted)]",
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={clsx(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--kz-surface-hover)] text-[var(--kz-sidebar-text)] border border-[var(--kz-border)]",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Moodle Link & Official Verification footer */}
      <div className="p-3 border-t border-[var(--kz-sidebar-border)] space-y-2">
        <a
          href="https://moodle.universemvp.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--kz-surface-hover)] hover:bg-[var(--kz-surface-active)] text-[var(--kz-sidebar-text)] hover:text-[var(--kz-sidebar-text-hover)] text-xs font-medium transition-colors border border-[var(--kz-border)]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Moodle Karazin LMS</span>
          </div>
          <ExternalLink size={13} className="text-[var(--kz-sidebar-text-muted)]" />
        </a>

        <div className="px-2 py-1 flex items-center justify-between text-[10px] text-[var(--kz-sidebar-text-muted)] font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-[var(--kz-brand-primary)]" />
            <span>UniHub v1.2.4</span>
          </span>
          <span>ХНУ © 2026</span>
        </div>
      </div>
    </aside>
  )
}