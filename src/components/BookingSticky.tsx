'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { BookingForm } from './BookingForm'
import { BookingPayment } from './BookingPayment'
import { BookingSuccess } from './BookingSuccess'
import { BookingButton } from './BookingButton'
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'
import { Button } from './lib/button'
import { createPaymentIntent } from '@/utils/stripeUtils'
import { createBooking, checkSystemAvailability } from '@/utils/bookingUtils'

export default function BookingSticky() {
  const {
    formState,
    formData,
    setDataState,
    setPaymentState,
    updateFormData,
    setLoading,
    setSuccessState,
    setErrorState,
    price,
  } = useFormStore()
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isSystemAvailable, setIsSystemAvailable] = useState(true)

  const checkAvailability = useCallback(async () => {
    try {
      const result = await checkSystemAvailability()
      setIsSystemAvailable(result.status === 'OK')
      if (result.status !== 'OK') {
        setErrorDetails(result.message)
      }
      return result.status === 'OK'
    } catch (error) {
      console.error('Error checking system availability:', error)
      setIsSystemAvailable(false)
      setErrorDetails(
        'No se pudo verificar la disponibilidad del sistema. Por favor, inténtelo más tarde.',
      )
      return false
    }
  }, [])

  const initializePayment = useCallback(async () => {
    if (formState === 'payment' && !clientSecret) {
      try {
        setLoading(true)

        // Verificar disponibilidad antes de iniciar el pago
        const isAvailable = await checkAvailability()
        if (!isAvailable) {
          setErrorDetails(
            'El sistema no está disponible en este momento. Por favor, inténtelo más tarde.',
          )
          setDataState()
          return
        }

        const secret = await createPaymentIntent(price)
        setClientSecret(secret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        setErrorDetails('Error al preparar el pago. Por favor, inténtelo de nuevo.')
        setDataState()
      } finally {
        setLoading(false)
      }
    }
  }, [formState, clientSecret, setLoading, setDataState, price, checkAvailability])

  useEffect(() => {
    initializePayment()
  }, [initializePayment])

  const handleFormSubmit = (data: BookingFormData) => {
    updateFormData(data)
    setPaymentState()
  }

  const handlePaymentComplete = async () => {
    try {
      setLoading(true)
      const result = await createBooking({ ...formData, price })
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
    } finally {
      setLoading(false)
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
    // Aquí puedes añadir la lógica para ver otras instalaciones
    console.log('Ver otras instalaciones')
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
      <div className="flex justify-between items-center font-cal leading-3">
        <h2 className="">Reserva tu instalación</h2>
        <h3>{price > 0 ? ` ${price.toFixed(2)}€` : ''}</h3>
      </div>
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
