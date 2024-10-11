'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import convertToSubcurrency from '../convertToSubcurrency'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function createPaymentIntent(blockId: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.id': {
        equals: blockId,
      },
    },
  })
  const matchingBlock = result.docs[0]?.body?.layout?.find(
    (item: any) => item.id === blockId,
  ) as any
  if (!matchingBlock) {
    throw new Error('Bloque de StripeTPV no encontrado')
  }
  const price = matchingBlock.stripeInfo?.price

  if (!price || typeof price !== 'number') {
    throw new Error('La cantidad no es valida')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToSubcurrency(price) || 0.1,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error('Internal Error:', error)
    throw new Error(`Internal Server Error: ${error}`)
  }
}
export async function getCard(methodId: string) {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(methodId)

    if (paymentMethod.type === 'card' && paymentMethod.card) {
      const { last4, brand, exp_month, exp_year } = paymentMethod.card
      return {
        success: true,
        cardInfo: { last4, brand, exp_month, exp_year },
      }
    } else {
      return {
        success: false,
        error: 'No se encontró información de la tarjeta',
      }
    }
  } catch (error) {
    console.error('Error al recuperar la información de la tarjeta:', error)
    return {
      success: false,
      error: 'Error al recuperar la información de la tarjeta',
    }
  }
}
export async function addToPayload(formData: any) {
  console.log(formData)

  const payload = await getPayloadHMR({ config: configPromise })
  const result = await payload.create({
    collection: 'payments',
    data: formData,
  })
  console.log(result)
}
