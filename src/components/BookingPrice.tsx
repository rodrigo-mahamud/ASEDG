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
  const endDate = dayjs().add(daysAmount, 'day').format('DD/MM/YYYY')

  return (
    <div className="mt-0 mb-5 p-5 bg-secondary rounded-md">
      <div className="flex justify-between mb-1 text-sm">
        <span>Finaliza el :</span>
        <span>{endDate}</span>
      </div>
      <div className="flex justify-between mb-1 text-sm">
        <span>Nº de días:</span>
        <span>{daysAmount}</span>
      </div>

      <div className="flex justify-between text-sm">
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
