import React from 'react'
import { IconAlertCircle } from '@tabler/icons-react'

interface BookingErrorProps {
  errorDetails: string | null
}

export function BookingError({ errorDetails }: BookingErrorProps) {
  if (!errorDetails) return null

  return (
    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
      <IconAlertCircle className="mr-2 h-5 w-5" />
      <div>
        <h3 className="font-bold">Error al procesar la reserva:</h3>
        <p>{errorDetails}</p>
      </div>
    </div>
  )
}
