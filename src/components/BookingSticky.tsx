'use client'
import React, { useEffect } from 'react'
import { BookingForm } from './BookingForm'
import { BookingPayment } from './BookingPayment'
import { BookingSuccess } from './BookingSuccess'
import { BookingButton } from './BookingButton'
import useBookingState from '@/utils/useBookingState'
import { Button } from './ui/button'
import { useBookingHandlers } from '@/utils/bookingHandlers'
import { BookingError } from './BookingError'
import { BookingPrice } from './BookingPrice'
import Link from 'next/link'
import DownloadTerms from './DownloadTerms'

export default function BookingSticky({ data, className }: any) {
  const { formState, errorDetails, successMessage, clientSecret, isLoading } = useBookingState()

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
    <aside className={className}>
      <div className="md:bg-white px-4 md:p-5 rounded-lg md:shadow-lg">
        {formState !== 'success' && (
          <div className="md:flex md:flex-col hidden">
            <h2 className="md:text-xl font-semibold "> Reservar gimnasio municipal</h2>
            <h3 className="md:text-sm opacity-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
          </div>
        )}
        {renderContent()}
        {formState !== 'success' && <BookingPrice />}
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
      </div>
    </aside>
  )
}
