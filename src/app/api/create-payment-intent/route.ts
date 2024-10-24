import { NextRequest, NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const { amount, customer } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      receipt_email: customer.email,
      metadata: {
        customerName: customer.name,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Internal Error:', error)
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
