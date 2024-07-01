import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import { IconCheck } from '@tabler/icons-react'

interface BookingSuccessProps {
  message: string
}

export function BookingSuccess({ message }: BookingSuccessProps) {
  const [isConfettiRunning, setIsConfettiRunning] = useState(true)
  const [play] = useSound('/sounds/success.mp3', { volume: 0.5 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConfettiRunning(false)
    }, 1500) // Detiene el confeti después de 5 segundos

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <Confetti
        className="!fixed "
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={isConfettiRunning}
        numberOfPieces={450}
        friction={1}
      />
      <div className="mt-4 p-6  flex flex-col items-center">
        <div className="bg-green-500 text-white rounded-full p-3 mb-4">
          <IconCheck className="h-6 w-6" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2 ">¡Todo listo!</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
