'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { IconChevronDown } from '@tabler/icons-react'
import { bookingSchema, BookingFormData } from '@/utils/bookingValidations'
import useFormStore from '@/utils/useBookingState'

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { formData, updateFormData, setDataState, setEmptyState } = useFormStore()

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: formData,
  })

  useEffect(() => {
    const subscription = form.watch((data) => {
      updateFormData(data as BookingFormData)
      validateForm(data as BookingFormData)
    })
    return () => subscription.unsubscribe()
  }, [form, updateFormData])

  const validateForm = async (data: BookingFormData) => {
    try {
      await bookingSchema.parseAsync(data)
      setDataState()
    } catch (error) {
      console.log('Form is invalid', error)
      setEmptyState()
    }
  }

  const handleSubmit = (data: BookingFormData) => {
    updateFormData(data)
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="periodo"
          render={({ field }) => (
            <BookingPeriods field={field} initiallyOpen={!!formData.periodo} />
          )}
        />
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border-x border-b border-input p-4 mb-4 rounded-b-md"
        >
          <CollapsibleTrigger className="w-full flex justify-between items-center gap-2">
            <div className="flex flex-col text-start justify-start w-10/12">
              <h3 className="font-semibold">Datos Personales</h3>
              <h4 className="text-sm">Completa tus datos personales.</h4>
            </div>
            <div className="pr-2">
              <IconChevronDown
                stroke={1.5}
                className={`h-5 w-5 transition-transform duration-300 text-secondaryAlt ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-6">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        className="rounded-sm focus-visible:border-secondaryAlt"
                        label="Nombre"
                        {...field}
                      />
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
                      <FloatingLabelInput
                        className="rounded-sm focus-visible:border-secondaryAlt"
                        label="Apellidos"
                        {...field}
                      />
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
                      <FloatingLabelInput
                        className="rounded-sm focus-visible:border-secondaryAlt"
                        label="D.N.I"
                        {...field}
                      />
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
                        className="rounded-sm focus-visible:border-secondaryAlt"
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
                    <FloatingLabelInput
                      className="rounded-sm focus-visible:border-secondaryAlt"
                      label="Correo Electrónico"
                      {...field}
                    />
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
                    <FloatingLabelInput
                      className="rounded-sm focus-visible:border-secondaryAlt"
                      label="Teléfono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>
        <FormField
          control={form.control}
          name="terminos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 py-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  className="data-[state=checked]:bg-secondaryAlt border-secondaryAlt rounded-sm"
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Acepto los términos y condiciones</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
