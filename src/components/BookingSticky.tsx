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
import { BookingPrice } from './BookingPrice'
import Link from 'next/link'
import DownloadTerms from './DownloadTerms'

export default function BookingSticky({ data, termsFile, className }: any) {
  console.log(data)

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
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {formState !== 'success' && (
          <>
            <h2 className="text-xl font-semibold "> Reservar gimnasio municipal</h2>
            <h3 className="text-sm opacity-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
          </>
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

      <DownloadTerms
        className="mt-10 mb-2 group p-5 border border-border rounded-lg flex items-center"
        termsFile={termsFile}
        target="_blank"
      >
        <div className="flex flex-col w-11/12 items-start">
          <h2 className="text-base font-semibold mb-1">Términos y condiciones</h2>
          <h3 className="text-sm line-clamp-2 text-pretty text-muted-foreground text-start">
            Recuerda echar un vistazo a los terminos y condiciones
          </h3>
        </div>
        <div className="w-1/12 flex justify-center items-center">
          <Button
            variant="arrow"
            iconClass="w-3 h-3"
            className="text-foreground bg-border/35 w-10 h-10"
          ></Button>
        </div>
      </DownloadTerms>
    </aside>
  )
}
