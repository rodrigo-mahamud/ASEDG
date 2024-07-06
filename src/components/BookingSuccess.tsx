import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import { IconCheck } from '@tabler/icons-react'

interface BookingSuccessProps {
  message: string
}

export function BookingSuccess({ message }: BookingSuccessProps) {
  const [isConfettiRunning, setIsConfettiRunning] = useState(true)
  const [play] = useSound('/success.mp3', { volume: 0.4 })

  useEffect(() => {
    play()
    const timer = setTimeout(() => {
      setIsConfettiRunning(false)
    }, 1200) // Detiene el confeti después de 5 segundos

    return () => clearTimeout(timer)
  }, [play])

  return (
    <div className="relative">
      <Confetti
        className="!fixed "
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={isConfettiRunning}
        numberOfPieces={450}
        gravity={0.97}
      />
      <div className="pb-7 flex flex-col items-center">
        <video src="/prueba.webm" className="w-24 h-24" autoPlay muted playsInline></video>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">¡Reserva confirmada!</h3>
          <p>
            Tu reserva en el Gimnasio Municipal se ha completado con éxito. Pronto recibirás un
            email con tu código de acceso y los detalles de tu reserva.
          </p>
          <p>¡Nos vemos en el gimnasio!</p>
        </div>
      </div>
    </div>
  )
}
