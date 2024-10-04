'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import useFormStore from '@/utils/useBookingState'

interface BookingCheckoutProps {
  onPaymentComplete: () => Promise<void>
  onError: (error: string) => void
  clientSecret: string
}

export function BookingCheckout({
  onPaymentComplete,
  onError,
  clientSecret,
}: BookingCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { setSuccessState, setErrorState, setLoading } = useFormStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isProcessing || !stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setLoading(true)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message || 'Error al enviar el formulario de pago.')
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
      })

      if (error) {
        throw new Error(error.message || 'Ha ocurrido un error al procesar el pago.')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        await onPaymentComplete()
        setSuccessState()
      } else {
        throw new Error('Estado de pago desconocido. Por favor, contacte con soporte.')
      }
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message)
      } else {
        onError('Ha ocurrido un error inesperado.')
      }
      setErrorState()
    } finally {
      setLoading(false)
      setIsProcessing(false)
    }
  }

  return (
    <form id="stripe-form" onSubmit={handleSubmit} className="bg-white py-5 rounded-md">
      <PaymentElement />
    </form>
  )
}
