'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'
import { Button } from '@/components/lib/button'
import { addVisitor, updateVisitor, generatePinCode, getPayload } from '@/utils/dashboard/data'
import { defaultValues, VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { SelectDate } from './SelectDate'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { toast } from '@payloadcms/ui'
import { IconLoader2, IconRefresh } from '@tabler/icons-react'
import { PeriodsData } from '@/utils/dashboard/types'

const AddEditForm = React.memo(function AddEditForm() {
  const { clientToEdit, setIsOpen } = useDashboardStore()
  const [isGeneratingPin, setIsGeneratingPin] = useState(false)
  const [pinCodeChanged, setPinCodeChanged] = useState(false)
  const initialPinGeneratedRef = useRef(false)
  const [data, setData] = useState<PeriodsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onSubmit',
    defaultValues: clientToEdit || defaultValues,
  })

  const fetchPayload = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getPayload()
      form.setValue('schedule_id', data.regularSchedule.scheduleID)
      setData(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching periods:', err)
      toast.error('Error al consultar los horarios de la instalacción')
      setError('Error al consultar los horarios de la instalacción')
      setIsLoading(false)
    }
  }, [form])

  const handleGeneratePin = useCallback(async () => {
    setIsGeneratingPin(true)
    try {
      const result = await generatePinCode()
      if (result.success) {
        form.setValue('pin_code', result.pinCode)
        setPinCodeChanged(true)
      } else {
        toast.error('Error al generar el código PIN')
      }
    } catch (error) {
      console.error('Error generating PIN code:', error)
      toast.error('Error al generar el código PIN')
    } finally {
      setIsGeneratingPin(false)
    }
  }, [form])

  useEffect(() => {
    if (!clientToEdit && !form.getValues().pin_code && !initialPinGeneratedRef.current) {
      handleGeneratePin()
      initialPinGeneratedRef.current = true
    }
    fetchPayload()
  }, [clientToEdit, handleGeneratePin, form, fetchPayload])

  const handleSave = async (data: VisitorFormValues) => {
    const visitorData = { ...data }

    if (clientToEdit && !pinCodeChanged) {
      visitorData.pin_code = ''
    }

    if (clientToEdit) {
      try {
        await updateVisitor(visitorData)
        setIsOpen(false)
        toast.success('Usuario editado correctamente')
      } catch (error) {
        console.error('Error updating visitor:', error)
        toast.error('Ha ocurrido un error al editar el usuario')
      }
    } else {
      try {
        await addVisitor(visitorData)
        setIsOpen(false)
        toast.success('Usuario añadido correctamente')
      } catch (error) {
        console.error('Error adding visitor:', error)
        toast.error('Ha ocurrido un error al añadir al usuario')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="mt-6">
        <div className="px-8 space-y-5">
          <div className="flex w-full gap-5">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <FloatingLabelInput
                      className="text-base py-3 h-fit"
                      label="Nombre"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <FloatingLabelInput
                      className="text-base py-3 h-fit"
                      label="Apellidos"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormControl>
                    <FloatingLabelInput className="text-base py-3 h-fit" label="DNI" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormControl>
                    <FloatingLabelInput
                      className="text-base py-3 h-fit"
                      label="Edad"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? parseInt(e.target.value) : '')
                      }
                    />
                  </FormControl>
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
                  <FloatingLabelInput className="text-base py-3 h-fit" label="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile_phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    className="text-base py-3 h-fit"
                    label="Teléfono de contacto"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <SelectDate
                periods={data?.bookingOptions}
                isLoading={isLoading}
                error={error}
                field={{
                  value: {
                    start_time: form.getValues().start_time,
                    end_time: form.getValues().end_time,
                  },
                  onChange: (value) => {
                    form.setValue('start_time', value.start_time)
                    form.setValue('end_time', value.end_time)
                    form.setValue('price', value.price)
                  },
                }}
              />
            )}
          />
          {!clientToEdit ? (
            <div className="flex w-full">
              <FormField
                control={form.control}
                name="pin_code"
                render={({ field }) => (
                  <FormItem className="w-4/5">
                    <FormControl>
                      <FloatingLabelInput
                        className="text-base py-3 h-fit border-r-0 rounded-r-none "
                        label="Código PIN"
                        disabled={true}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          setPinCodeChanged(true)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={'outline'}
                onClick={handleGeneratePin}
                disabled={isGeneratingPin}
                className="w-1/5 h-fit py-3 bg-onTop text-base rounded-r-md"
              >
                {isGeneratingPin ? (
                  <IconLoader2 size={19} className="animate-spin" />
                ) : (
                  <IconRefresh size={19} />
                )}
              </Button>
            </div>
          ) : (
            ' '
          )}
          <FormField
            control={form.control}
            name="schedule_id"
            disabled={true}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    className={`text-base py-3 h-fit ${isLoading ? 'bg-onTop' : ''}`}
                    label="Identificador del horario"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormErrors form={form} />
        </div>
        <div className="bg-onTop w-full p-6 absolute bottom-0 border-t border-border">
          <Button type="submit" className="w-full rounded-md h-fit py-3 text-base">
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  )
})

export default AddEditForm
