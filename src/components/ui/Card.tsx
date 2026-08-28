import React from "react"
import clsx from "clsx"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered"
  padding?: "none" | "sm" | "md" | "lg"
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  ...props
}) => {
  const paddingStyles = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5",
    lg: "p-6 sm:p-7",
  }[padding]

  const variantStyles = {
    default:
      "bg-[var(--kz-surface)] border border-[var(--kz-border)] shadow-[var(--kz-shadow-sm)]",
    elevated:
      "bg-[var(--kz-surface)] border border-[var(--kz-border-subtle)] shadow-[var(--kz-shadow-md)]",
    bordered: "bg-[var(--kz-surface)] border-2 border-[var(--kz-border)]",
  }[variant]

  return (
    <div
      className={clsx(
        "rounded-[var(--kz-radius-lg)] transition-all duration-150",
        variantStyles,
        paddingStyles,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
