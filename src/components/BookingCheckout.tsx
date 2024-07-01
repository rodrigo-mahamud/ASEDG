'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Button } from '@/components/lib/button'
import { IconLoader2, IconArrowLeft } from '@tabler/icons-react'

interface BookingCheckoutProps {
  onPaymentComplete: () => Promise<void>
  onGoBack: () => void // Nueva prop para manejar la acción de volver
  clientSecret: string
}

export function BookingCheckout({
  onPaymentComplete,
  onGoBack,
  clientSecret,
}: BookingCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(undefined)

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage('Error al cargar el formulario de pago. Por favor, recargue la página.')
      setLoading(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message || 'Ha ocurrido un error al procesar el pago.')
      setLoading(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      await onPaymentComplete()
    }
  }

  if (!stripe || !elements) {
    return null
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={onGoBack} className="mb-4">
        <IconArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        <PaymentElement />
        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        <div className="flex justify-between mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Pagar'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
