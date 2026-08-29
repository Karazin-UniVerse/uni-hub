import React, { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
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

  const maxWidthClass = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[maxWidth]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Dialog box with spring motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={clsx(
              "relative w-full bg-[var(--kz-surface)] border border-[var(--kz-border)] rounded-[var(--kz-radius-xl)] shadow-[var(--kz-shadow-lg)] z-10 overflow-hidden",
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}