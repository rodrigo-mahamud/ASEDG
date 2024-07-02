import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/utils/stripeUtils'
import { BookingCheckout } from './BookingCheckout'
import { Skeleton } from '@/components/lib/skeleton'
import useFormStore from '@/utils/useBookingState'

interface BookingPaymentProps {
  clientSecret: string | null
  onPaymentComplete: () => Promise<void>
  onError: (error: string) => void
}

export function BookingPayment({ clientSecret, onPaymentComplete, onError }: BookingPaymentProps) {
  const { isLoading } = useFormStore()

  const renderSkeleton = () => (
    <div className="space-y-5 py-4 h-full">
      <Skeleton className="h-64 w-full" />
    </div>
  )

  const renderStripeForm = () => (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret! }}>
      <BookingCheckout
        onPaymentComplete={onPaymentComplete}
        onError={onError}
        clientSecret={clientSecret!}
      />
    </Elements>
  )

  return (
    <div className="min-h-[252px] h-fit transition-all duration-300">
      {isLoading || !clientSecret ? renderSkeleton() : renderStripeForm()}
    </div>
  )
}
