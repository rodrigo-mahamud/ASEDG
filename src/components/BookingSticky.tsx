'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { BookingForm } from './BookingForm'
import { BookingCheckout } from './BookingCheckout'
import {
  IconCheck,
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
  IconLoader2,
} from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'
import { Button } from './lib/button'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise, createPaymentIntent } from '@/utils/stripeUtils'
import { createBooking } from '@/utils/bookingUtils'
import { BookingSuccess } from './BookingSuccess'

export default function BookingSticky() {
  const {
    formState,
    formData,
    setDataState,
    setPaymentState,
    updateFormData,
    isLoading,
    setLoading,
    setSuccessState,
    setErrorState,
  } = useFormStore()
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const handleFormSubmit = (data: BookingFormData) => {
    updateFormData(data)
    setPaymentState()
  }

  const initializePayment = useCallback(async () => {
    if (formState === 'payment' && !clientSecret) {
      try {
        setLoading(true)
        const amount = 49.99 // Asegúrate de que este valor sea correcto para tu caso de uso
        const secret = await createPaymentIntent(amount)
        setClientSecret(secret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        setErrorDetails('Error al preparar el pago. Por favor, inténtelo de nuevo.')
        setDataState()
      } finally {
        setLoading(false)
      }
    }
  }, [formState, clientSecret, setLoading, setDataState])

  useEffect(() => {
    initializePayment()
  }, [initializePayment])

  const handlePaymentComplete = async () => {
    try {
      const result = await createBooking(formData)
      console.log('Reserva completada con éxito:', result)
      setSuccessMessage('Tu reserva se ha completado correctamente')
      setSuccessState()
    } catch (error) {
      console.error('Error en handlePaymentComplete:', error)
      let errorMessage = 'Error desconocido al procesar la reserva.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      setErrorDetails(errorMessage)
      setErrorState()
    }
  }

  const handleGoBack = () => {
    if (formState === 'payment') {
      setDataState()
    }
    setErrorDetails(null)
    setSuccessMessage(null)
    setClientSecret(null)
  }

  const handleError = (error: string) => {
    setErrorDetails(error)
    setErrorState()
  }

  const renderContent = () => {
    switch (formState) {
      case 'empty':
      case 'data':
        return <BookingForm onSubmit={handleFormSubmit} />
      case 'payment':
        return clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <BookingCheckout
              onPaymentComplete={handlePaymentComplete}
              onError={handleError}
              clientSecret={clientSecret}
            />
          </Elements>
        ) : (
          <div>Preparando el pago...</div>
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
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      {formState !== 'empty' && formState !== 'data' && formState !== 'success' && (
        <Button type="button" variant="outline" onClick={handleGoBack} className="mb-4">
          <IconArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      )}
      {renderContent()}
      {(formState === 'empty' || formState === 'data') && (
        <Button
          type="submit"
          className="w-full rounded-md py-3 h-auto bg-primary text-white"
          variant="expandIcon"
          iconClass="w-5 h-5"
          iconPlacement="right"
          Icon={IconArrowRight}
          onClick={() => formState === 'data' && setPaymentState()}
          disabled={formState === 'empty'}
        >
          Continuar con el pago
        </Button>
      )}
      {formState === 'payment' && clientSecret && (
        <Button
          form="stripe-form"
          type="submit"
          className="w-full rounded-md py-3 h-auto bg-primary text-white"
          variant="expandIcon"
          iconClass="w-5 h-5"
          iconPlacement="right"
          Icon={isLoading ? IconLoader2 : IconArrowRight}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Realizar Pago'}
        </Button>
      )}
      {errorDetails && formState !== 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{errorDetails}</p>
        </div>
      )}
    </aside>
  )
}
