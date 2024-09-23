import confetti from "canvas-confetti"

import { Button } from "@/components/ui/button"

export function ConfettiSideCannons({ onClick }: { onClick: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
    onClick()
  }

  return (
    <div className="relative flex w-full">
      <Button
        onClick={handleClick}
        className="m-auto w-full max-w-xl rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Submit
      </Button>
    </div>
  )
}
