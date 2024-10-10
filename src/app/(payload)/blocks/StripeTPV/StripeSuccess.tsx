'use client'
import React, { useEffect } from 'react'
import useSound from 'use-sound'
import confetti from 'canvas-confetti'
import { IconCheck } from '@tabler/icons-react'

const StripeSuccess = () => {
  const [play] = useSound('/success.mp3', { volume: 0.3 })

  const handleClick = () => {
    const duration = 3.5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        zIndex: 999,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        zIndex: 999,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }
  useEffect(() => {
    play()
    handleClick()
  }, [play])

  return (
    <div className="relative">
      <div className="pb-7 flex flex-col items-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <IconCheck className="h-10 w-10 text-green-500" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">¡Pago exsitoso!</h3>
          <p>Asdfs</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-md border border-muted p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Amount Paid</p>
                <p className="text-lg font-semibold text-foreground">$99.99</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                <p className="text-sm text-muted-foreground">Visa **** 1234</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                <p className="text-sm text-muted-foreground">123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripeSuccess
