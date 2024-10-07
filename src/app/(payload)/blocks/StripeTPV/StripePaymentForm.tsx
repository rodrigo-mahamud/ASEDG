'use client'
import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '@/utils/stripeUtils'

const StripePaymentForm: React.FC<any> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setError('Stripe no está cargado correctamente.')
      setLoading(false)
      return
    }

    try {
      const { nombre, apellidos, correo, cantidad } = props
      const clientSecret = await createPaymentIntent(cantidad, nombre, apellidos, correo)

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error('No se pudo obtener el elemento de tarjeta')
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${nombre} ${apellidos}`,
            email: correo,
          },
        },
      })

      if (result.error) {
        setError(result.error.message || 'Error en el pago')
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Pago completado con éxito')
        // Aquí puedes manejar el éxito del pago, por ejemplo, mostrar un mensaje o redirigir
      }
    } catch (err) {
      setError('Ocurrió un error al procesar el pago.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={props.nombre} readOnly />
      </div>
      <div>
        <label htmlFor="apellidos">Apellidos:</label>
        <input type="text" id="apellidos" value={props.apellidos} readOnly />
      </div>
      <div>
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" value={props.dni} readOnly />
      </div>
      <div>
        <label htmlFor="correo">Correo:</label>
        <input type="email" id="correo" value={props.correo} readOnly />
      </div>
      <div>
        <label htmlFor="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" value={props.cantidad} readOnly />
      </div>

      <div>
        <label htmlFor="tipoProducto">Tipo de Producto:</label>
        <input type="text" id="tipoProducto" value={props.tipoProducto} readOnly />
      </div>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default StripePaymentForm
