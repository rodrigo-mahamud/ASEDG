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
    <div className="space-y-5 p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
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
    <div className="min-h-[250px] transition-all duration-300">
      {isLoading || !clientSecret ? renderSkeleton() : renderStripeForm()}
    </div>
  )
}
