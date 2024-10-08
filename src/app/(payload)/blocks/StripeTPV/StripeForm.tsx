'use client'
import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '@/utils/stripeUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/lib/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/lib/form'
import { Input } from '@/components/lib/input'
import { Alert, AlertDescription } from '@/components/lib/alert'

export default function StripeForm({ stripeInfo }: any) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const stripe = useStripe()
  const elements = useElements()

  // Crear un esquema de validación dinámico basado en los campos proporcionados
  const formSchema = z.object(
    stripeInfo.stripefields.reduce((acc: any, field: any) => {
      let validator
      switch (field.fieldType) {
        case 'email':
          validator = z.string().email({ message: 'Email inválido' })
          break
        case 'number':
          validator = z.number().min(0, { message: 'Debe ser un número positivo' })
          break
        default:
          validator = z.string().min(1, { message: 'Este campo es requerido' })
      }
      acc[field.fieldName] = validator
      return acc
    }, {}),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: stripeInfo.stripefields.reduce((acc: any, field: any) => {
      acc[field.fieldName] = ''
      return acc
    }, {}),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setError('Stripe no está cargado correctamente.')
      setLoading(false)
      return
    }

    try {
      const { nombre, apellidos, correo, cantidad } = values
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {stripeInfo.stripefields.map((item: any, index: number) => (
          <FormField
            key={index}
            control={form.control}
            name={item.fieldLabel}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.fieldLabel}</FormLabel>
                <FormControl>
                  <Input
                    type={item.fieldType === 'number' ? 'number' : 'text'}
                    {...field}
                    onChange={(e) => {
                      const value =
                        item.fieldType === 'number' ? parseFloat(e.target.value) : e.target.value
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <CardElement />
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
