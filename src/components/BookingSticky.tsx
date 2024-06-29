// components/BookingSticky.tsx
'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage'
import convertToSubcurrency from '@/utils/convertToSubcurrency'
import React, { useState } from 'react'
import { Button } from '@/components/lib/button'
import { createBookingAndGrantAccess } from '@/app/actions'
import { toast } from 'sonner'
import { IconLoader2 } from '@tabler/icons-react'
import { BookingForm, BookingFormData } from './BookingForm'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function BookingSticky() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'terminos') {
          formData.append('remarks', 'Ha aceptado los términos y condiciones')
        } else {
          formData.append(key, value.toString())
        }
      })

      const result = await createBookingAndGrantAccess(formData)
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

  const handleFormStateChange = (isValid: boolean) => {
    setIsFormValid(isValid)
  }

  const amount = 49.99

  return (
    <aside className="btnShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'eur',
        }}
      >
        <BookingForm onSubmit={onSubmit} onFormStateChange={handleFormStateChange} />
        <CheckoutPage amount={amount} />
        <Button type="submit" disabled={isLoading || !isFormValid}>
          {isLoading ? (
            <>
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Por favor, espere
            </>
          ) : (
            'Reservar'
          )}
        </Button>
      </Elements>
    </aside>
  )
}
