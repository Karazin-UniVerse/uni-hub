import React from "react"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { ToastMessage } from "../../hooks/useToast"

export interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const icon = {
          success: (
            <CheckCircle2
              size={18}
              className="text-[var(--kz-success)] shrink-0"
            />
          ),
          warning: (
            <AlertCircle
              size={18}
              className="text-[var(--kz-warning)] shrink-0"
            />
          ),
          error: (
            <AlertCircle
              size={18}
              className="text-[var(--kz-danger)] shrink-0"
            />
          ),
          info: <Info size={18} className="text-[var(--kz-info)] shrink-0" />,
        }[toast.type]

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[var(--kz-surface)] border border-[var(--kz-border)] rounded-[var(--kz-radius-md)] shadow-[var(--kz-shadow-lg)] animate-in slide-in-from-bottom-2 duration-150"
          >
            {icon}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[var(--kz-text-primary)]">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-[var(--kz-text-muted)] hover:text-[var(--kz-text-primary)] p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
