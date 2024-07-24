'use client'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/lib/button'
import { addVisitor, getPeriods, updateVisitor } from '@/utils/dashboard/data'
import { VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/lib/sheet'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/lib/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AddEditDatePicker } from './AddEditDatePicker'

export default function AddEditVisitor() {
  const { isOpen, clientToEdit, setIsOpen } = useClientEditStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [periodsData, setPeriodsData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onBlur',
    defaultValues: {},
  })

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)
      getPeriods()
        .then((data) => {
          setPeriodsData(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message || 'Error al cargar los períodos')
          setIsLoading(false)
        })
    }
  }, [isOpen])

  useEffect(() => {
    if (clientToEdit) {
      form.reset({
        ...clientToEdit,
      })
    } else {
      form.reset({})
    }
  }, [clientToEdit, form])

  const handleSave = async (data: VisitorFormValues) => {
    try {
      if (data.id) {
        await updateVisitor({ ...data })
      } else {
        await addVisitor({ ...data })
      }
      setIsOpen(false)
    } catch (err) {
      console.error('Error al guardar el visitante:', err)
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  }

  const formContent = (
    <>
      {isLoading && <p>Cargando períodos...</p>}
      {error && <p>Error al cargar los períodos: {error}</p>}
      {periodsData && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-5">
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
              name="end_time"
              render={({ field }) => <AddEditDatePicker periodsData={periodsData} field={field} />}
            />
            <FormErrors form={form} />
            <Button type="submit">Guardar cambios</Button>
          </form>
        </Form>
      )}
    </>
  )

  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</DrawerTitle>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="useTw border-border sm:max-w-96">
        <SheetHeader>
          <SheetTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</SheetTitle>
          <SheetDescription>
            Haz cambios en el perfil del cliente aquí. Haz clic en guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        {formContent}
      </SheetContent>
    </Sheet>
  )
}
