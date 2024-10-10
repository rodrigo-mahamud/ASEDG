'use client'

import React, { memo } from 'react'
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
import normaliceFormKeys from '@/utils/stripe/normaliceFormKeys'
import { toast } from 'sonner'
function StripeForm({ stripeInfo, blockId }: StripeFormProps) {
  console.log('me he render')

  const stripe = useStripe()
  const elements = useElements()
  const { formState, formData, isLoading, setFormState, updateFormData, setLoading } = stripeState()

  const { schema, type } = createStripeForm(stripeInfo.stripefields)

  const form = useForm<typeof type>({
    // resolver: zodResolver(schema),
    defaultValues: stripeInfo.stripefields.reduce(
      (acc, field) => {
        acc[field.fieldLabel] = ''
        return acc
      },
      {} as Record<string, string>,
    ),
  })

  const onSubmit = async (values: FormDataTypes<typeof schema>, event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      updateFormData({ error: 'La pasarela de pago no se ha cargado correctamente.' })
      return
    }

    setLoading(true)
    updateFormData({ error: null })

    try {
      const stipreElements = await elements.submit()

      if (stipreElements.error) {
        throw new Error(stipreElements.error.message || 'Error al enviar los detalles de pago')
      }

      const formData = normaliceFormKeys(values)
      const { clientSecret } = await createPaymentIntent(formData, blockId)
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          receipt_email: formData.email,
          return_url: `${window.location.href}?paymentStatus=success`,
        },
        redirect: 'always',
      })

      if (result.error) {
        toast.error('Error al realizar el pago.')
        throw new Error(result.error.message || 'Error en el pago')
      }

      // Éxito del pago
      console.log('Pago completado con éxito')
      setFormState('success')
      toast.success('Pago completado con éxito')
    } catch (err) {
      toast.error('Error al realizar el pago.')
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="bg-gray-50 px-6 py-6">
          <PaymentElement />
          <Button
            className="w-full mt-6 rounded-md py-3 h-auto text-white hover:bg-primary/90 hover:animate-none animate-shine bg-gradient-to-r from-primary via-primary/85 to-primary bg-[length:200%_100%]"
            type="submit"
            variant={'expandIcon'}
            Icon={IconCreditCardPay}
            iconPlacement="right"
            iconClass="w-5 h-5"
          >
            {isLoading ? 'Procesando...' : 'Pagar'}
          </Button>
        </div>
      </form>
      {formData.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{formData.error}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
export default memo(StripeForm)
