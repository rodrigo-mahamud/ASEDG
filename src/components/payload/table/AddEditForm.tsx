'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'
import { Button } from '@/components/lib/button'
import { addVisitor, updateVisitor, generatePinCode, getPayload } from '@/utils/dashboard/actions'
import { defaultValues, VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { SelectDate } from './SelectDate'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { toast } from '@payloadcms/ui'
import { IconCircleCheck, IconLoader2, IconRefresh, IconUsersPlus } from '@tabler/icons-react'
import { PeriodsData } from '@/utils/dashboard/types'

const AddEditForm = React.memo(function AddEditForm() {
  const { clientToEdit, setIsOpen } = useDashboardStore()
  const [pinCodeChanged, setPinCodeChanged] = useState(false)
  const initialPinGeneratedRef = useRef(false)
  const [data, setData] = useState<PeriodsData | null>(null)
  const [isLoading, setIsLoading] = useState({
    periods: false,
    pinCode: false,
    saving: false,
  })
  const [error, setError] = useState<string | null>(null)

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onSubmit',
    defaultValues: clientToEdit || defaultValues,
  })

  const fetchPayload = useCallback(async () => {
    try {
      setIsLoading((prevState) => ({ ...prevState, periods: true }))
      const data = await getPayload()
      form.setValue('schedule_id', data?.regularSchedule?.scheduleID)
      setData(data)
    } catch (err) {
      console.error('Error fetching periods:', err)
      toast.error('Error al consultar los horarios de la instalación.')
      setError(
        'Error al consultar los horarios de la instalación, recuerda que la instalación debe tener horario de apertura configurado, para ello ve a instalacciones > selecciona la instalaccion > horario de apertura',
      )
    } finally {
      setIsLoading((prevState) => ({ ...prevState, periods: false }))
    }
  }, [form])

  const handleGeneratePin = useCallback(async () => {
    setIsLoading((prevState) => ({ ...prevState, pinCode: true }))
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
      setIsLoading((prevState) => ({ ...prevState, pinCode: false }))
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
    setIsLoading((prevState) => ({ ...prevState, saving: true }))
    if (clientToEdit) {
      try {
        await updateVisitor(visitorData)
      } catch (error) {
        console.error('Error updating visitor:', error)
        toast.error('Ha ocurrido un error al editar el usuario')
      }
    } else {
      try {
        setIsLoading((prevState) => ({ ...prevState, saving: true }))
        await addVisitor(visitorData)
      } catch (error) {
        console.error('Error adding visitor:', error)
        toast.error('Ha ocurrido un error al añadir al usuario')
      }
    }
    setIsOpen(false)
    toast.success('Usuario editado correctamente')
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
                isLoading={isLoading.periods}
                error={error}
                field={{
                  value: {
                    start_time: form.getValues().start_time,
                    end_time: form.getValues().end_time,
                    period_id: form.getValues().period_id,
                  },
                  onChange: (value) => {
                    form.setValue('start_time', value.start_time)
                    form.setValue('end_time', value.end_time)
                    form.setValue('price', value.price)
                    form.setValue('period_id', value.period_id)
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
                disabled={isLoading.pinCode}
                className="w-1/5 h-[inherit] py-3 bg-onTop text-base rounded-r-md"
              >
                {isLoading.pinCode ? (
                  <IconLoader2 size={16} className="animate-spin" />
                ) : (
                  <IconRefresh size={16} />
                )}
              </Button>
            </div>
          ) : (
            ' '
          )}
          <FormErrors form={form} />
        </div>
        <div className="bg-onTop w-full p-6 absolute bottom-0 border-t border-border">
          <Button
            disabled={isLoading.periods || isLoading.pinCode || isLoading.saving}
            type="submit"
            className="w-full rounded-md h-fit py-4 flex items-center "
          >
            {isLoading.periods || isLoading.pinCode || isLoading.saving ? (
              <IconLoader2 size={16} stroke={1.5} className="animate-spin" />
            ) : clientToEdit ? (
              <>
                <IconCircleCheck size={16} className="mr-1" />
                <span className="leading-none text-lg font"> Guardar cambios </span>
              </>
            ) : (
              <>
                <IconUsersPlus size={16} className="mr-1" />
                <span className="leading-none text-lg font"> Añadir usuario </span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
})

export default AddEditForm
