import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import confetti from 'canvas-confetti'

interface BookingSuccessProps {
  message: string
}

export function BookingSuccess({ message }: BookingSuccessProps) {
  const [play] = useSound('/success.mp3', { volume: 0.3 })

  const handleClick = () => {
    const duration = 4.5 * 1000
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
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
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
        <video src="/prueba.webm" className="w-24 h-24" autoPlay muted playsInline></video>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">¡Reserva confirmada!</h3>
          <p>
            Tu reserva en el Gimnasio Municipal se ha completado con éxito. Pronto recibirás un
            email con tu código de acceso y los detalles de tu reserva
          </p>
          <p>¡Nos vemos en el gimnasio!</p>
        </div>
      </div>
    </div>
  )
}
