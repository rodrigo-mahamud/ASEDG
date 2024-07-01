'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BookingForm, BookingFormData } from './BookingForm'
import { BookingCheckout } from './BookingCheckout'
import { Skeleton } from '@/components/lib/skeleton'
import { stripePromise, createPaymentIntent } from '@/utils/stripeUtils'
import { createBooking } from '@/utils/bookingUtils'

const PaymentFormSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-1/2" />
  </div>
)

export default function BookingSticky() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<BookingFormData | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  const amount = 49.99

  useEffect(() => {
    if (showPayment && !clientSecret) {
      createPaymentIntent(amount)
        .then(setClientSecret)
        .catch((error) => toast.error(error.message))
    }
  }, [showPayment, clientSecret, amount])

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data)
    setShowPayment(true)
  }

  const handlePaymentComplete = async () => {
    if (!formData) return

    setIsLoading(true)
    setErrorDetails(null)
    try {
      const result = await createBooking(formData)
      toast.success(result.message)
      console.log('Token de acceso:', result.accessToken)
      router.push('/payment-success')
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
    <aside className="border border-input bigShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      {!showPayment ? (
        <BookingForm onSubmit={handleFormSubmit} />
      ) : clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'stripe' },
          }}
        >
          <BookingCheckout onPaymentComplete={handlePaymentComplete} clientSecret={clientSecret} />
        </Elements>
      ) : (
        <PaymentFormSkeleton />
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
