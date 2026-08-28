import React from "react"
import clsx from "clsx"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-medium gap-1.5 rounded-[var(--kz-radius-sm)]",
    md: "px-4 py-2 text-sm font-medium gap-2 rounded-[var(--kz-radius-md)]",
    lg: "px-5 py-2.5 text-base font-semibold gap-2.5 rounded-[var(--kz-radius-md)]",
  }[size]

  const variantStyles = {
    primary:
      "bg-[var(--kz-brand-primary)] text-white hover:bg-[var(--kz-brand-hover)] active:bg-[var(--kz-brand-dark)] shadow-[var(--kz-shadow-sm)] border border-transparent",
    secondary:
      "bg-[var(--kz-surface-hover)] text-[var(--kz-text-primary)] hover:bg-[var(--kz-surface-active)] border border-[var(--kz-border)]",
    outline:
      "bg-transparent text-[var(--kz-brand-primary)] border border-[var(--kz-brand-primary)] hover:bg-[var(--kz-brand-light)] dark:hover:bg-[rgba(0,82,204,0.15)]",
    ghost:
      "bg-transparent text-[var(--kz-text-secondary)] hover:bg-[var(--kz-surface-hover)] hover:text-[var(--kz-text-primary)] border border-transparent",
    danger:
      "bg-[var(--kz-danger)] text-white hover:opacity-90 active:opacity-100 border border-transparent shadow-[var(--kz-shadow-sm)]",
  }[variant]

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-sans cursor-pointer transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kz-brand-primary)] disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles,
        variantStyles,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </>
      )}
    </button>
  )
}
