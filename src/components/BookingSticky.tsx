// components/BookingSticky.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/lib/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/lib/form'
import { Input } from '@/components/lib/input'
import { toast } from 'sonner'
import { createBookingAndGrantAccess } from '@/app/actions/bookingActions'
import { BookingPeriods } from './BookingPeriods'

// Función para validar el DNI español
const validateDNI = (dni: string) => {
  const dniRegex = /^(\d{8})([A-Z])$/
  const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE'

  const match = dni.match(dniRegex)
  if (!match) return false

  const number = parseInt(match[1])
  const letter = match[2]

  return validLetters.charAt(number % 23) === letter
}

const bookingSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  edad: z.number().min(16, 'Debes ser mayor de 16 años'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono inválido'),
  dni: z.string().refine(validateDNI, {
    message: 'DNI español inválido',
  }),
  periodo: z.enum(['un_dia', 'un_mes', 'tres_meses'], {
    required_error: 'Por favor selecciona un periodo',
  }),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookingSticky() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      edad: undefined,
      email: '',
      telefono: '',
      dni: '',
      periodo: undefined,
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, value.toString()))

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

  return (
    <aside className="border border-black p-7 w-2/6 sticky top-28 rounded-lg h-fit shadow-xl">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
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
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ej: 12345678Z" />
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
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: 666777888" />
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Reservar'}
          </Button>
        </form>
      </Form>
    </aside>
  )
}
