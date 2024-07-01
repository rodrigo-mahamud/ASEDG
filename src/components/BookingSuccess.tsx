import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import { IconCheck } from '@tabler/icons-react'

interface BookingSuccessProps {
  message: string
}

export function BookingSuccess({ message }: BookingSuccessProps) {
  const [isConfettiActive, setIsConfettiActive] = useState(true)
  const [play] = useSound('/success.wav', { volume: 0.5 })

  useEffect(() => {
    play()
    const timer = setTimeout(() => {
      setIsConfettiActive(false)
    }, 5000) // Detiene el confeti después de 5 segundos

    return () => clearTimeout(timer)
  }, [play])

  return (
    <div className="relative">
      {isConfettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="mt-4 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center shadow-lg">
        <IconCheck className="mr-4 h-8 w-8 text-green-500" />
        <div>
          <h3 className="font-bold text-lg mb-2">¡Reserva Exitosa!</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
