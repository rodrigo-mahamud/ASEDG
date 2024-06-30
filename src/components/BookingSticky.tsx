'use client'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/lib/button'
import { createBookingAndGrantAccess } from '@/app/actions'
import { toast } from 'sonner'
import { IconLoader2 } from '@tabler/icons-react'
import { BookingForm, BookingFormData } from './BookingForm'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const CheckoutForm = ({
  amount,
  onPaymentComplete,
}: {
  amount: number
  onPaymentComplete: () => void
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((err) => {
        console.error('Error creating PaymentIntent:', err)
        setErrorMessage('Error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.')
      })
  }, [amount])

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

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setErrorMessage(error.message || 'Ha ocurrido un error al procesar el pago.')
    } else {
      // El pago se ha procesado correctamente
      onPaymentComplete()
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Cargando...
          </span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
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
    </form>
  )
}

export default function BookingSticky() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<BookingFormData | null>(null)

  const amount = 49.99

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data)
    setShowPayment(true)
  }

  const handlePaymentComplete = async () => {
    if (!formData) return

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'terminos') {
          formDataToSend.append('remarks', 'Ha aceptado los términos y condiciones')
        } else {
          formDataToSend.append(key, value.toString())
        }
      })

      const result = await createBookingAndGrantAccess(formDataToSend)
      if (result.success) {
        toast.success(result.message)
        console.log('Token de acceso:', result.accessToken)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error('Error al procesar la reserva')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside className="btnShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      {!showPayment ? (
        <BookingForm onSubmit={handleFormSubmit} />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(amount),
            currency: 'eur',
          }}
        >
          <CheckoutForm amount={amount} onPaymentComplete={handlePaymentComplete} />
        </Elements>
      )}
    </aside>
  )
}
