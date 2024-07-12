import React from 'react'
import useBookingState from '@/utils/useBookingState'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export function BookingPrice() {
  const { formData, price } = useBookingState()
  const { daysAmount } = formData

  if (!daysAmount || price === 0) {
    return null
  }

  const pricePerDay = price / daysAmount
  const endDate = dayjs().add(daysAmount, 'day').format('DD MMMM YYYY')

  return (
    <div className="mt-0 mb-8 p-4 bg-secondary rounded-md">
      <div className="flex justify-between mb-2">
        <span>Duración de la reserva:</span>
        <span>
          {daysAmount} {daysAmount === 1 ? 'día' : 'días'}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Fecha de finalización:</span>
        <span>{endDate}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Precio por día:</span>
        <span>{pricePerDay.toFixed(2)}€</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between font-semibold">
        <span>Total a pagar:</span>
        <span>{price.toFixed(2)}€</span>
      </div>
    </div>
  )
}
