import React from "react"
import clsx from "clsx"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "primary"
  size?: "sm" | "md"
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-semibold",
  }[size]

  const variantStyles = {
    default:
      "bg-[var(--kz-surface-active)] text-[var(--kz-text-secondary)] border border-[var(--kz-border)]",
    success:
      "bg-[var(--kz-success-bg)] text-[var(--kz-success-text)] border border-[var(--kz-success-border)]",
    warning:
      "bg-[var(--kz-warning-bg)] text-[var(--kz-warning-text)] border border-[var(--kz-warning-border)]",
    danger:
      "bg-[var(--kz-danger-bg)] text-[var(--kz-danger-text)] border border-[var(--kz-danger-border)]",
    info: "bg-[var(--kz-info-bg)] text-[var(--kz-info-text)] border border-[var(--kz-info-border)]",
    primary:
      "bg-[var(--kz-brand-light)] text-[var(--kz-brand-hover)] border border-[var(--kz-brand-primary)]/20 dark:bg-[rgba(0,82,204,0.15)] dark:text-[#60A5FA]",
  }[variant]

  const dotColors = {
    default: "bg-[var(--kz-text-muted)]",
    success: "bg-[var(--kz-success)]",
    warning: "bg-[var(--kz-warning)]",
    danger: "bg-[var(--kz-danger)]",
    info: "bg-[var(--kz-info)]",
    primary: "bg-[var(--kz-brand-primary)]",
  }[variant]

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[var(--kz-radius-full)] leading-none select-none tracking-wide",
        sizeStyles,
        variantStyles,
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotColors)}
        />
      )}
      <span>{children}</span>
    </span>
  )
}
