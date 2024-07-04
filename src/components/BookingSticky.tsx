'use client'
import React, { useEffect } from 'react'
import { BookingForm } from './BookingForm'
import { BookingPayment } from './BookingPayment'
import { BookingSuccess } from './BookingSuccess'
import { BookingButton } from './BookingButton'
import useBookingState from '@/utils/useBookingState'
import { Button } from './lib/button'
import { useBookingHandlers } from '@/utils/bookingHandlers'
import { BookingError } from './BookingError'

export default function BookingSticky({ data }: any) {
  const { formState, price, errorDetails, successMessage, clientSecret, isLoading } =
    useBookingState()

  const {
    initializePayment,
    handleFormSubmit,
    handlePaymentComplete,
    handleGoBack,
    handleError,
    handleDataSubmit,
    handlePaymentSubmit,
  } = useBookingHandlers()

  useEffect(() => {
    initializePayment()
  }, [initializePayment])

  const renderContent = () => {
    switch (formState) {
      case 'empty':
      case 'data':
        return <BookingForm onSubmit={handleFormSubmit} data={data} />
      case 'payment':
        return (
          <BookingPayment
            clientSecret={clientSecret}
            onPaymentComplete={handlePaymentComplete}
            onError={handleError}
          />
        )
      case 'success':
        return (
          <BookingSuccess
            message={successMessage || 'Tu reserva se ha completado correctamente.'}
          />
        )
      case 'error':
        return <BookingError errorDetails={errorDetails}></BookingError>
      default:
        return null
    }
  }

  return (
    <aside className="btnShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal leading-3">
        Reserva tu instalación {price > 0 ? `- ${price.toFixed(2)}€` : ''}
      </h2>

      {renderContent()}

      <div className="flex gap-2">
        {formState !== 'empty' && formState !== 'data' && formState !== 'success' && (
          <div className="flex items-center">
            <Button
              type="button"
              variant="arrowReversed"
              onClick={handleGoBack}
              iconClass="w-3 h-3"
              className="bg-secondary rounded-md py-3 px-4 h-full"
            ></Button>
          </div>
        )}
        <BookingButton
          onDataSubmit={handleDataSubmit}
          onPaymentSubmit={handlePaymentSubmit}
          clientSecret={clientSecret}
        />
      </div>
    </aside>
  )
}
