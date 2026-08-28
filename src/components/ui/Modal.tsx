import React, { useEffect } from "react"
import clsx from "clsx"
import { X } from "lucide-react"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl"
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const maxWidthClass = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[maxWidth]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div
        className={clsx(
          "relative w-full bg-[var(--kz-surface)] border border-[var(--kz-border)] rounded-[var(--kz-radius-xl)] shadow-[var(--kz-shadow-lg)] z-10 overflow-hidden animate-in zoom-in-95 duration-150",
          maxWidthClass,
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--kz-border)] bg-[var(--kz-surface)]">
          <div>
            <h3 className="text-base font-bold text-[var(--kz-text-primary)] leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--kz-text-muted)] hover:text-[var(--kz-text-primary)] hover:bg-[var(--kz-surface-hover)] rounded-full transition-colors cursor-pointer"
            aria-label="Закрити"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
