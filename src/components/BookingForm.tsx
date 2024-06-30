'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/lib/form'
import { Checkbox } from '@/components/lib/checkbox'
import { BookingPeriods } from './BookingPeriods'
import { FloatingLabelInput } from './lib/floatinglabel'
import { Button } from '@/components/lib/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { IconChevronCompactUp, IconChevronDown } from '@tabler/icons-react'

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

export type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: {
      nombre: '',
      apellidos: '',
      edad: 16,
      email: '',
      telefono: '',
      dni: '',
      periodo: '',
      terminos: false,
    },
  })

  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <FormField
          control={form.control}
          name="periodo"
          render={({ field }) => <BookingPeriods field={field} />}
        />
        <Collapsible className="border border-gray-300 p-4">
          <CollapsibleTrigger className="w-full flex justify-between gap-2 ">
            Introducir datos <IconChevronDown></IconChevronDown>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="flex gap-4">
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
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormControl>
                      <FloatingLabelInput label="D.N.I" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="edad"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormControl>
                      <FloatingLabelInput
                        label="Edad"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseInt(e.target.value) : '')
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="terminos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0  py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Acepto los términos y condiciones</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
          Continuar al pago
        </Button>
      </form>
    </Form>
  )
}

// Función para validar el DNI español (implementa esta función según tus necesidades)
function validateDNI(dni: string): boolean {
  // Implementa la lógica de validación del DNI aquí
  return true // Placeholder
}
