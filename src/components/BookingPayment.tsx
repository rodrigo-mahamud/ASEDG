import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/utils/stripeUtils'
import { BookingCheckout } from './BookingCheckout'
import { Skeleton } from '@/components/lib/skeleton'

interface BookingPaymentProps {
  clientSecret: string | null
  onPaymentComplete: () => Promise<void>
  onError: (error: string) => void
}

export function BookingPayment({ clientSecret, onPaymentComplete, onError }: BookingPaymentProps) {
  if (!clientSecret) {
    return (
      <div className="space-y-6 p-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full mt-4" />
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <BookingCheckout
        onPaymentComplete={onPaymentComplete}
        onError={onError}
        clientSecret={clientSecret}
      />
    </Elements>
  )
}
