import confetti from "canvas-confetti"

export function fireCelebrationConfetti() {
  if (typeof window === "undefined") return

  confetti({
    particleCount: 60,
    spread: 55,
    origin: { y: 0.75, x: 0.5 },
    colors: ["#0052CC", "#00F0FF", "#FFE600", "#16A34A", "#7C5CFF"],
  })

  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 45,
      origin: { x: 0.2, y: 0.75 },
      colors: ["#0052CC", "#00F0FF", "#FFE600"],
    })
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 45,
      origin: { x: 0.8, y: 0.75 },
      colors: ["#0052CC", "#00F0FF", "#FFE600"],
    })
  }, 150)
}