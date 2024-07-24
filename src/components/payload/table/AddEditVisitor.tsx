'use client'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/lib/sheet'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/lib/drawer'
import { Button } from '@/components/lib/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/lib/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { addVisitor, updateVisitor, getPeriods } from '@/utils/dashboard/data'
import { visitorSchema, VisitorFormValues } from '@/utils/dashboard/validationSchema'
import { toast } from '@payloadcms/ui'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'

export function AddEdit() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { isOpen, clientToEdit, setIsOpen, resetStore } = useClientEditStore()
  const [periods, setPeriods] = useState<any[]>([])

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      dni: '',
      age: '',
      mobile_phone: '',
      period: '',
      acceptedTerms: false,
    },
  })

  useEffect(() => {
    async function fetchPeriods() {
      const periodsData = await getPeriods()
      setPeriods(periodsData.bookingOptions || [])
    }
    fetchPeriods()
  }, [])

  useEffect(() => {
    if (clientToEdit) {
      const [age, dni, acceptedTerms] = clientToEdit.remarks.split(';')
      form.reset({
        ...clientToEdit,
        age,
        dni,
        acceptedTerms: acceptedTerms === '1',
      })
    } else {
      form.reset({
        first_name: '',
        last_name: '',
        email: '',
        dni: '',
        age: '',
        mobile_phone: '',
        period: '',
        acceptedTerms: false,
      })
    }
  }, [clientToEdit, form])

  const handleClose = () => {
    setIsOpen(false)
    resetStore()
    form.reset()
  }

  const handleSave = async (data: VisitorFormValues) => {
    try {
      const remarks = `${data.age};${data.dni};1`
      let result
      if (data.id) {
        result = await updateVisitor({ ...data, remarks })
      } else {
        const currentTime = Math.floor(Date.now() / 1000)
        const oneYearFromNow = currentTime + 365 * 24 * 60 * 60
        result = await addVisitor({
          ...data,
          remarks,
          start_time: currentTime,
          end_time: oneYearFromNow,
        })
      }
      if (result.success) {
        handleClose()
        toast.success(data.id ? 'Actualizado correctamente' : 'Añadido correctamente')
      }
    } catch (error) {
      toast.error('No se ha podido procesar la solicitud. Inténtalo de nuevo más tarde.')
    }
  }

  const Content = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-5">
        <div className="flex w-full gap-5">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <FloatingLabelInput className="text-base py-3 h-fit" label="Nombre" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FloatingLabelInput className="text-base py-3 h-fit" label="Email" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un período" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name} - {period.price}€ - {period.daysAmount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormErrors form={form} />
        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  )

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="useTw border-border sm:max-w-96">
          <SheetHeader>
            <SheetTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</SheetTitle>
            <SheetDescription>
              Haz cambios en el perfil del cliente aquí. Haz clic en guardar cuando hayas terminado.
            </SheetDescription>
          </SheetHeader>
          {Content}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</DrawerTitle>
        </DrawerHeader>
        {Content}
      </DrawerContent>
    </Drawer>
  )
}
