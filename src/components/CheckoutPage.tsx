import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency'

interface CheckoutPageProps {
  amount: number
  onPaymentComplete: () => void
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount, onPaymentComplete }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
      })
      .catch((err) => {
        console.error('Error creating PaymentIntent:', err)
        setErrorMessage('Error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.')
      })
  }, [amount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(undefined)

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage('Error al cargar el formulario de pago. Por favor, recargue la página.')
      setLoading(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setErrorMessage(error.message || 'Ha ocurrido un error al procesar el pago.')
    } else {
      // El pago se ha procesado correctamente
      onPaymentComplete()
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Cargando...
          </span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  )
}

export default CheckoutPage
