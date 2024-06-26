// components/BookingSticky.tsx
'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { toast } from 'sonner'
import { createBookingAndGrantAccess } from '@/app/actions/bookingActions'

const bookingSchema = z.object({
  date: z.string().nonempty('La fecha es requerida'),
  startTime: z.string().nonempty('La hora de inicio es requerida'),
  endTime: z.string().nonempty('La hora de fin es requerida'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookingSticky() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: '',
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, value))

      const result = await createBookingAndGrantAccess(formData)
      if (result.success) {
        toast.success(result.message)
        // Aquí podrías mostrar el token de acceso al usuario o redirigir a una página de confirmación
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
    <aside className="btnShadow p-7 w-2/6 sticky top-28 rounded-lg h-fit">
      <h2 className="font-cal mb-4">Reserva tu instalación</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de inicio</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de fin</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Reservar'}
          </Button>
        </form>
      </Form>
    </aside>
  )
}
