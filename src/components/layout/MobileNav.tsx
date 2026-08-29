import React from "react"
import clsx from "clsx"
import { NAV_ITEMS } from "./Sidebar"

export interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--kz-sidebar-bg)] border-t border-[var(--kz-sidebar-border)] px-2 py-1.5 flex items-center justify-around transition-colors">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={clsx(
              "flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer",
              isActive
                ? "text-[var(--kz-brand-primary)] font-bold"
                : "text-[var(--kz-sidebar-text)] hover:text-[var(--kz-sidebar-text-hover)]",
            )}
          >
            <Icon size={18} className="mb-0.5" />
            <span className="truncate max-w-[64px]">
              {item.label.split(" ")[0]}
            </span>
          </button>
        )
      })}
    </nav>
  )
}