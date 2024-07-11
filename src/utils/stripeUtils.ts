import { loadStripe } from '@stripe/stripe-js'
import convertToSubcurrency from './convertToSubcurrency'
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export async function createPaymentIntent(
  amount: number,
  name: string,
  lastName: string,
  email: string,
) {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        customer: {
          name: `${name} ${lastName}`,
          email: email,
          // Añade más campos si es necesario
        },
      }),
    })
    const data = await response.json()
    return data.clientSecret
  } catch (err) {
    console.error('Error creating PaymentIntent:', err)
    throw new Error('Error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.')
  }
}
