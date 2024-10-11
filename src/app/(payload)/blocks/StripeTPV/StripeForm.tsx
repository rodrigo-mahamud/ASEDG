'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { createPaymentIntent, getCard } from '@/utils/stripe/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/lib/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { Alert, AlertDescription } from '@/components/lib/alert'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { createStripeForm, FormDataTypes } from '@/utils/stripe/validateForm'
import { StripeFormProps } from '@/types/types-stripe'
import stripeState from '@/utils/stripe/stripeState'
import { IconCreditCardPay, IconRefresh } from '@tabler/icons-react'
import normaliceFormKeys from '@/utils/stripe/normaliceFormKeys'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import StripeSkeleton from './StripeSkeleton'
import StripeFormErrors from './StripeFormErrors'
import { Skeleton } from '@/components/lib/skeleton'

function StripeForm({ stripeInfo, blockId }: StripeFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const stripe = useStripe()
  const elements = useElements()
  const { formData, updateFormData, setLoading, isLoading } = stripeState()
  const [isDisabled, setIsdisabled] = useState(true)
  const { schema, type } = createStripeForm(stripeInfo.stripefields)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const form = useForm<typeof type>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      ...stripeInfo.stripefields.reduce(
        (acc, field) => {
          acc[field.fieldLabel] = ''
          return acc
        },
        {} as Record<string, string>,
      ),
      email: '',
      dni: '',
    },
  })
  const savePaidRecently = () => {
    const paidRecentlyData = {
      timestamp: new Date().getTime(),
      url: window.location.href,
    }
    localStorage.setItem('paidRecently', JSON.stringify(paidRecentlyData))
  }

  const updateUrlParams = (status: 'success' | 'error') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('paymentStatus', status)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const fetchClientSecret = async () => {
      setLoading(true)
      try {
        const { clientSecret: secret } = await createPaymentIntent(blockId)
        setClientSecret(secret)
      } catch (error) {
        console.error('Error fetching client secret:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientSecret()
  }, [blockId, setLoading])

  const onSubmit = async (values: FormDataTypes<typeof schema>, event: any) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      console.log('Error al cargar Stripe')
      return
    }
    setLoading(true)

    try {
      const stipreElements = await elements.submit()
      if (stipreElements.error) {
        throw new Error(stipreElements.error.message || 'Error al enviar los detalles de pago')
      }

      const formData = normaliceFormKeys(values) //llamar a payload

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          receipt_email: formData.email,
          return_url: `${window.location.origin}${window.location.pathname}?paymentStatus=success`,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        console.error(result.error.message || 'Error en el pago')
        updateUrlParams('error')
        toast.error('Error al realizar el pago.')
        setLoading(false)
      }

      // Éxito del pago
      updateFormData(formData)
      toast.success('Pago completado con éxito')
      updateUrlParams('success')
      savePaidRecently()
      if (result.paymentIntent && result.paymentIntent.payment_method) {
        const cardResponse = await getCard(result.paymentIntent.payment_method as string)
        if (cardResponse.success) {
          updateFormData({ ...formData, cardInfo: cardResponse.cardInfo })
        } else {
          console.error('Error al obtener la información de la tarjeta:', cardResponse.error)
        }
      }
      const transactionId = result.paymentIntent?.id
      updateFormData({
        ...formData,
        transactionId: transactionId,
      })
    } catch (err) {
      console.error(err)
      toast.error('Error al realizar el pago.')
      updateUrlParams('error')
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
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
                    type={'text'}
                    {...formField}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="email"
          render={({ field: formField }) => (
            <FormItem className="w-full !ml-0">
              <FormControl>
                <FloatingLabelInput
                  label="Correo Electrónico"
                  className="h-12 "
                  type="email"
                  {...formField}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dni"
          render={({ field: formField }) => (
            <FormItem className="w-full !ml-0">
              <FormControl>
                <FloatingLabelInput label="D.N.I" className="h-12 " type="text" {...formField} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
      <div className="bg-gray-50 px-6 py-6 min-h-80 flex flex-col justify-between">
        <div className="relative w-full h-full mb-6">
          {!clientSecret && <StripeSkeleton className="w-full absolute z-10 h-full" />}
          {clientSecret && (
            <PaymentElement
              onChange={(e) => {
                if (e.complete) {
                  setIsdisabled(false)
                }
              }}
            />
          )}
        </div>
        <StripeFormErrors form={form}></StripeFormErrors>

        <Button
          className="w-full flex items-center rounded-md py-3 h-auto text-white hover:bg-primary/90 hover:animate-none animate-shine bg-gradient-to-r from-primary via-primary/85 to-primary bg-[length:200%_100%]"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            formRef?.current?.requestSubmit()
          }}
          variant={'expandIcon'}
          Icon={IconCreditCardPay}
          iconPlacement="right"
          iconClass="w-5 h-5"
          disabled={isDisabled || isLoading || Object.keys(form.formState.errors).length > 0}
        >
          {isLoading ? (
            <Skeleton className="w-40 h-4 rounded-sm bg-indigo-300"></Skeleton>
          ) : (
            <span className="text-base">Pagar {stripeInfo.price}€</span>
          )}
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

export default memo(StripeForm)
