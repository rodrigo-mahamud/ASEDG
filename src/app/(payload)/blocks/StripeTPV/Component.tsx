'use client'
import React, { useState, useEffect } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Container from '@/components/Container'
import StripeForm from './StripeForm'
import StripeCard from './StripeCard'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function StripePaymentComponent({
  stripeInfo,
  cardIncluded,
  cardDescription,
  cardTitle,
}: any) {
  const [stripeLoaded, setStripeLoaded] = useState(false)

  useEffect(() => {
    stripePromise.then(() => setStripeLoaded(true))
  }, [])

  if (!stripeLoaded) {
    return <div>Cargando...</div>
  }

  return (
    <Container>
      <Elements stripe={stripePromise}>
        <StripeForm stripeInfo={stripeInfo} />
        <StripeCard
          cardTitle={cardTitle}
          cardDescription={cardDescription}
          cardIncluded={cardIncluded}
          stripeInfo={stripeInfo}
        ></StripeCard>
      </Elements>
    </Container>
  )
}
