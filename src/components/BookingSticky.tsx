'use client'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency'
import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { Button } from '@/components/lib/button'
import { toast } from 'sonner'
import { IconLoader2 } from '@tabler/icons-react'
import { BookingForm, BookingFormData } from './BookingForm'
import { Skeleton } from '@/components/lib/skeleton'
import { useRouter } from 'next/navigation'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const CheckoutForm = ({
  amount,
  onPaymentComplete,
  clientSecret,
}: {
  amount: number
  onPaymentComplete: () => Promise<void>
  clientSecret: string
}) => {
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
    return <PaymentFormSkeleton />
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

const PaymentFormSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-1/2" />
  </div>
)

const StripePaymentForm = ({ amount, onPaymentComplete, clientSecret }) => (
  <Suspense fallback={<PaymentFormSkeleton />}>
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: 'stripe' },
      }}
    >
      <CheckoutForm
        amount={amount}
        onPaymentComplete={onPaymentComplete}
        clientSecret={clientSecret}
      />
    </Elements>
  </Suspense>
)

export default function BookingSticky() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<BookingFormData | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  const amount = 49.99

  const createPaymentIntent = useCallback(async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      })
      const data = await response.json()
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.error('Error creating PaymentIntent:', err)
      toast.error('Error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.')
    }
  }, [amount])

  useEffect(() => {
    if (showPayment && !clientSecret) {
      createPaymentIntent()
    }
  }, [showPayment, clientSecret, createPaymentIntent])

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data)
    setShowPayment(true)
  }

  const handlePaymentComplete = async () => {
    if (!formData) return

    setIsLoading(true)
    setErrorDetails(null)
    try {
      console.log('Iniciando proceso de registro después del pago...')
      console.log('Datos del formulario preparados:', formData)

      const response = await fetch('/api/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Resultado de la API create-booking:', result)

      if (result.success) {
        toast.success(result.message)
        console.log('Token de acceso:', result.accessToken)
        router.push('/payment-success')
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error en handlePaymentComplete:', error)
      let errorMessage = 'Error desconocido al procesar la reserva.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast.error(errorMessage)
      setErrorDetails(`Error detallado: ${JSON.stringify(error, null, 2)}`)
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
        <Suspense fallback={<PaymentFormSkeleton />}>
          {clientSecret ? (
            <StripePaymentForm
              amount={amount}
              onPaymentComplete={handlePaymentComplete}
              clientSecret={clientSecret}
            />
          ) : (
            <PaymentFormSkeleton />
          )}
        </Suspense>
      )}
      {errorDetails && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Detalles del error:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{errorDetails}</pre>
        </div>
      )}
      {isLoading && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <p>Procesando la reserva...</p>
        </div>
      )}
    </aside>
  )
}
