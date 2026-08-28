import { useState, useCallback } from "react"

export interface ToastMessage {
  id: string
  type: "success" | "info" | "warning" | "error"
  title: string
  message?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (toast: Omit<ToastMessage, "id">, duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: ToastMessage = { ...toast, id }
      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
