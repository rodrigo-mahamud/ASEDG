'use client'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { BookingPeriods } from './BookingPeriods'
import { FloatingLabelInput } from './ui/floatinglabel'
import { bookingSchema, BookingFormTypes } from '@/utils/bookingValidations'
import useFormStore from '@/utils/useBookingState'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface BookingFormProps {
  onSubmit: (data: BookingFormTypes) => void
  data: any
}

export function BookingForm({ onSubmit, data }: BookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { formData, updateFormData, setDataState, setEmptyState } = useFormStore()

  const form = useForm<BookingFormTypes>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    defaultValues: formData,
  })

  const validateForm = useCallback(
    async (data: BookingFormTypes) => {
      try {
        await bookingSchema.parseAsync(data)
        setDataState()
      } catch (error) {
        setEmptyState()
      }
    },
    [setDataState, setEmptyState],
  )
  useEffect(() => {
    const subscription = form.watch((data) => {
      updateFormData(data as BookingFormTypes)
      validateForm(data as BookingFormTypes)
    })
    return () => subscription.unsubscribe()
  }, [form, updateFormData, validateForm])

  const handleSubmit = (data: BookingFormTypes) => {
    updateFormData(data)
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="py-6 md:py-5">
        <FormField
          control={form.control}
          name={'daysAmount'}
          render={({ field }) => <BookingPeriods field={field} data={data} />}
        />
        <Accordion
          type="single"
          collapsible
          className="border border-border rounded-md overflow-hidden"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="w-full flex justify-between items-center gap-2 md:hover:bg-secondary px-4 py-3 duration-200">
              <div className="flex flex-col text-start justify-start w-10/12">
                <h3 className="text-base font-semibold">Datos Personales</h3>
                <span className="text-xs text-muted-foreground">
                  Completa tus datos personales.
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 md:space-y-4 pt-2 px-4 pb-6">
              <div className="flex md:flex-row flex-col gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
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
                          className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
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
                          className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
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
                          className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
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
                        className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
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
                        className="rounded-sm h-12 md:h-10 focus-visible:border-secondaryAlt"
                        label="Teléfono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terminos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        className="data-[state=checked]:bg-secondaryAlt border-secondaryAlt rounded-full"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">Acepto los términos y condiciones</div>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  )
}
