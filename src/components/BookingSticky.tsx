'use client'
import React, { useEffect, useCallback } from 'react'
import { BookingForm } from './BookingForm'
import { BookingPayment } from './BookingPayment'
import { BookingSuccess } from './BookingSuccess'
import { BookingButton } from './BookingButton'
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react'
import useBookingState from '@/utils/useBookingState'
import { Button } from './lib/button'
import { createPaymentIntent } from '@/utils/stripeUtils'
import { createBooking, checkSystemAvailability } from '@/utils/bookingUtils'
import { BookingFormTypes } from '@/utils/bookingValidations'

export default function BookingSticky() {
  const {
    formState,
    formData,
    isLoading,
    price,
    errorDetails,
    successMessage,
    clientSecret,
    setDataState,
    setPaymentState,
    setSuccessState,
    setErrorState,
    updateFormData,
    setLoading,
    setErrorDetails,
    setSuccessMessage,
    setClientSecret,
  } = useBookingState()

  const initializePayment = useCallback(async () => {
    if (formState === 'payment' && !clientSecret) {
      try {
        setLoading(true)
        const isAvailable = await checkSystemAvailability()
        if (!isAvailable) {
          setDataState()
          return
        }

        const secret = await createPaymentIntent(price)
        setClientSecret(secret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        setErrorDetails('Error al preparar el pago. Por favor, inténtelo de nuevo.')
        setErrorState()
        setDataState()
      } finally {
        setLoading(false)
      }
    }
  }, [
    formState,
    clientSecret,
    setLoading,
    setDataState,
    price,
    setErrorState,
    setErrorDetails,
    setClientSecret,
  ])

  useEffect(() => {
    initializePayment()
  }, [initializePayment])

  const handleFormSubmit = (data: BookingFormTypes) => {
    updateFormData(data)
    setPaymentState()
  }

  const handlePaymentComplete = async () => {
    try {
      setLoading(true)
      const result = await createBooking({ ...formData, price } as BookingFormTypes)
      console.log('Reserva completada con éxito:', result)
      setSuccessMessage('Tu reserva se ha completado correctamente')
      setSuccessState()
    } catch (error) {
      console.error('Error en handlePaymentComplete:', error)
      if (error instanceof Error) {
        setErrorDetails(error.message)
      } else {
        setErrorDetails('Error desconocido al procesar la reserva.')
      }
      setErrorState()
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    if (formState === 'payment') {
      setDataState()
    }
    setSuccessMessage(null)
    setClientSecret(null)
    setErrorDetails(null)
  }

  const handleError = (error: string) => {
    setErrorDetails(error)
    setErrorState()
  }

  const handleDataSubmit = () => {
    setPaymentState()
  }

  const handlePaymentSubmit = () => {
    const stripeForm = document.getElementById('stripe-form') as HTMLFormElement
    if (stripeForm) {
      stripeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }

  const handleSuccessAction = () => {
    // Aquí puedes añadir la lógica para ver otras instalaciones o reiniciar el proceso
    console.log('Acción después del éxito')
  }

  const renderContent = () => {
    switch (formState) {
      case 'empty':
      case 'data':
        return <BookingForm onSubmit={handleFormSubmit} />
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
        return (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <IconAlertCircle className="mr-2 h-5 w-5" />
            <div>
              <h3 className="font-bold">Error al procesar la reserva:</h3>
              <p>{errorDetails}</p>
            </div>
          </div>
        )
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
          onSuccessAction={handleSuccessAction}
          clientSecret={clientSecret}
          disabled={formState === 'error' || isLoading}
        />
      </div>
      {errorDetails && formState !== 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{errorDetails}</p>
        </div>
      )}
    </aside>
  )
}
