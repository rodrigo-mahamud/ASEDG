'use client'

import React from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '@/utils/stripe/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/lib/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { Alert, AlertDescription } from '@/components/lib/alert'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { createStripeForm, FormDataTypes } from '@/utils/stripe/validateForm'
import { StripeFormProps } from '@/types/types-stripe'
import stripeState from '@/utils/stripe/stripeState'
import { IconCreditCardPay } from '@tabler/icons-react'

export default function StripeForm({ stripeInfo }: StripeFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { formState, formData, isLoading, setFormState, updateFormData, setLoading } = stripeState()

  const { schema, type } = createStripeForm(stripeInfo.stripefields)

  const form = useForm<typeof type>({
    resolver: zodResolver(schema),
    defaultValues: stripeInfo.stripefields.reduce(
      (acc, field) => {
        acc[field.fieldName] = ''
        return acc
      },
      {} as Record<string, string>,
    ),
  })

  const onSubmit = async (values: FormDataTypes<typeof schema>) => {
    if (!stripe || !elements) {
      updateFormData({ error: 'Stripe no está cargado correctamente.' })
      return
    }

    setLoading(true)
    updateFormData({ error: null })

    try {
      const formData = new FormData()
      formData.append('amount', stripeInfo.price.toString())
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      const { clientSecret } = await createPaymentIntent(formData)

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
      })

      if (result.error) {
        throw new Error(result.error.message || 'Error en el pago')
      }

      // Éxito del pago
      console.log('Pago completado con éxito')
      setFormState('success')
      // Aquí puedes manejar el éxito del pago, por ejemplo, mostrar un mensaje o redirigir
    } catch (err) {
      updateFormData({
        error: err instanceof Error ? err.message : 'Ocurrió un error al procesar el pago.',
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-wrap space-x-4 p-6"
      >
        {stripeInfo.stripefields.map((field, index) => (
          <FormField
            key={index}
            control={form.control}
            name={field.fieldLabel}
            render={({ field: formField }) => (
              <FormItem className={`${field.halfWidth ? 'flex-1 !mt-0 ' : 'w-full !mx-0'}`}>
                <FormControl>
                  <FloatingLabelInput
                    label={field.fieldLabel}
                    className="h-12"
                    type={field.fieldType === 'number' ? 'number' : 'text'}
                    {...formField}
                    onChange={(e) => {
                      const value =
                        field.fieldType === 'number' ? parseFloat(e.target.value) : e.target.value
                      formField.onChange(value)
                      updateFormData({ [field.fieldName]: value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
      <div className="bg-gray-50 px-6 py-6">
        <PaymentElement />
        <Button
          className="w-full mt-6 rounded-md py-3 h-auto text-white hover:bg-primary/90 hover:animate-none animate-shine bg-gradient-to-r from-primary via-primary/85 to-primary bg-[length:200%_100%]"
          type="submit"
          variant={'expandIcon'}
          Icon={IconCreditCardPay}
          iconPlacement="right"
          iconClass="w-5 h-5"
          disabled={!stripe || isLoading || formState !== 'success'}
        >
          {isLoading ? 'Procesando...' : 'Pagar'}
        </Button>
      </div>
      {formData.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{formData.error}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
