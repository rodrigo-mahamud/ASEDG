import React from 'react'
import useBookingState from '@/utils/useBookingState'
import { calculateTotalDays, formatPeriod, getEndDate } from '@/utils/bookingDateFormat'

export function BookingPrice() {
  const { price, periodLength, periodType } = useBookingState()

  if (!periodType || price === 0) {
    return null
  }

  const totalDays = calculateTotalDays(periodType, periodLength || 0)
  const pricePerDay = totalDays > 0 ? price / totalDays : price

  return (
    <div className="mt-0 mb-8 p-4 bg-secondary rounded-md">
      {periodType !== 'fixed' && (
        <>
          <div className="flex justify-between mb-2">
            <span>Nº días:</span>
            <span>{totalDays}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Precio por día:</span>
            <span>{pricePerDay.toFixed(2)}€</span>
          </div>
        </>
      )}
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between font-semibold">
        <span>Total a pagar:</span>
        <span>{price.toFixed(2)}€</span>
      </div>
    </div>
  )
}
