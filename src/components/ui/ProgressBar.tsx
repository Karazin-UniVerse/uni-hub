import React from "react"
import clsx from "clsx"

export interface ProgressBarProps {
  value: number // 0 to 100
  max?: number
  height?: "sm" | "md" | "lg"
  showLabel?: boolean
  colorVariant?: "auto" | "primary" | "success" | "warning" | "danger"
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = "md",
  showLabel = false,
  colorVariant = "auto",
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

  const heightClass = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }[height]

  const getColor = () => {
    if (colorVariant !== "auto") {
      return {
        primary: "bg-[var(--kz-brand-primary)]",
        success: "bg-[var(--kz-success)]",
        warning: "bg-[var(--kz-warning)]",
        danger: "bg-[var(--kz-danger)]",
      }[colorVariant]
    }
    if (percentage >= 90) return "bg-[var(--kz-success)]"
    if (percentage >= 75) return "bg-[var(--kz-brand-primary)]"
    if (percentage >= 60) return "bg-[var(--kz-warning)]"
    return "bg-[var(--kz-danger)]"
  }

  return (
    <div className={clsx("w-full", className)}>
      <div
        className={clsx(
          "w-full bg-[var(--kz-border)] rounded-full overflow-hidden",
          heightClass,
        )}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-500 ease-out",
            getColor(),
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-[11px] text-[var(--kz-text-secondary)] mt-1 font-mono">
          <span>
            {value} / {max}
          </span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  )
}
