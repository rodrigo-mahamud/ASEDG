import React from 'react'
import useBookingState from '@/utils/useBookingState'

export function BookingPrice() {
  const { formData, price } = useBookingState()

  const days = formData.periodo as number

  if (!days || price === 0) {
    return null
  }

  const pricePerDay = price / days

  return (
    <div className="mt-0 mb-8 p-4 bg-secondary rounded-md">
      <div className="flex justify-between mb-2">
        <span>Días:</span>
        <span>{days}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Precio por día:</span>
        <span>{pricePerDay.toFixed(2)}€</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>{price.toFixed(2)}€</span>
      </div>
    </div>
  )
}
