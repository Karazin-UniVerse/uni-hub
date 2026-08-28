import { useState, useCallback } from "react"

export function useClipboard(timeout = 2000) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        setTimeout(() => setCopiedText(null), timeout)
        return true
      } catch (err) {
        console.error("Failed to copy to clipboard", err)
        return false
      }
    },
    [timeout],
  )

  return { copiedText, copy, isCopied: (text: string) => copiedText === text }
}
