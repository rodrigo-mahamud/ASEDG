// components/BookingSticky.tsx
'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage'
import convertToSubcurrency from '@/utils/convertToSubcurrency'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/lib/button'
import { createBookingAndGrantAccess } from '@/app/actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/lib/form'
import { Checkbox } from '@/components/lib/checkbox'
import { toast } from 'sonner'
import { BookingPeriods } from './BookingPeriods'
import { IconLoader2 } from '@tabler/icons-react'
import { FloatingLabelInput } from './lib/floatinglabel'
const prohibitedDomains = [
  'mohmal.com',
  'yopmail.com',
  'emailondeck.com',
  'tempail.com',
  'bupmail.com',
  'emailfake.com',
  'guerrillamail.com',
  'crazymailing.com',
  'tempr.email',
  'throwawaymail.com',
  'maildrop.cc',
  '10minutemail.com',
  'getnada.com',
  'mintemail.com',
]
const bookingSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre debe tener al menos 2 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre no puede contener números ni caracteres especiales',
    ),
  apellidos: z
    .string()
    .min(1, 'Los apellidos deben tener al menos 2 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'Los apellidos no pueden contener números ni caracteres especiales',
    ),
  edad: z.number().min(16, 'Debes ser mayor de 16 años'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .refine(
      (email) => !prohibitedDomains.some((domain) => email.toLowerCase().endsWith(`@${domain}`)),
      {
        message:
          'Por favor, utiliza tu dirección de correo personal no se admiten mails temporales',
      },
    ),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
  dni: z.string().refine(validateDNI, { message: 'DNI español inválido' }),
  periodo: z.enum(['un_dia', 'un_mes', 'tres_meses']),
  terminos: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
})

type BookingFormData = z.infer<typeof bookingSchema>
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function BookingSticky() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange', // Esto activará la validación onBlur
    criteriaMode: 'firstError',
    defaultValues: {
      nombre: '',
      apellidos: '',
      edad: undefined,
      email: '',
      telefono: '',
      dni: '',
      periodo: undefined,
      terminos: false,
    },
  })

  const { isValid } = form.formState

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'terminos') {
          formData.append('remarks', 'Ha aceptado los términos y condiciones')
        } else {
          formData.append(key, value.toString())
        }
      })

      const result = await createBookingAndGrantAccess(formData)
      if (result.success) {
        toast.success(result.message)
        console.log('Token de acceso:', result.accessToken)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error('Error al procesar la reserva')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const amount = 49.99
  return (
    <aside className="btnShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="edad"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Edad"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Correo Electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="D.N.I" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="periodo"
            render={({ field }) => <BookingPeriods field={field} />}
          />
          <FormField
            control={form.control}
            name="terminos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Acepto los términos y condiciones</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid || isLoading}>
            {isLoading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Por favor, espere
              </>
            ) : (
              'Reservar'
            )}
          </Button>
        </form>
      </Form>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'eur',
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </aside>
  )
}

// Función para validar el DNI español (implementa esta función según tus necesidades)
function validateDNI(dni: string): boolean {
  // Implementa la lógica de validación del DNI aquí
  return true // Placeholder
}
