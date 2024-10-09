'use server'

import { revalidatePath } from 'next/cache'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function createPaymentIntent(formData: FormData) {
  const amount = formData.get('amount')

  if (!amount || typeof amount !== 'string') {
    throw new Error('Amount is required and must be a string')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    revalidatePath('/payments') // Adjust this path as needed
    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error('Internal Error:', error)
    throw new Error(`Internal Server Error: ${error}`)
  }
}
