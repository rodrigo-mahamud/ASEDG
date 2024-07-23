'use client'
import { useEffect } from 'react'
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
import { Input } from '@/components/lib/input'
import { Checkbox } from '@/components/lib/checkbox'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { addVisitor, updateVisitor } from '@/utils/dashboard/data'
import { visitorSchema, VisitorFormValues } from '@/utils/dashboard/validationSchema'
import { toast } from '@payloadcms/ui'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'

export function AddEdit() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { isOpen, clientToEdit, setIsOpen, resetStore } = useClientEditStore()

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      dni: '',
      age: '',
      acceptedTerms: false,
    },
  })

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
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <FloatingLabelInput className="text-base" label="Nombre" {...field} />
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
                  <FloatingLabelInput className="text-base" label="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormControl>
                  <FloatingLabelInput label="DNI" {...field} />
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
                  <FloatingLabelInput label="Edad" type="number" {...field} />
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
                <FloatingLabelInput label="Email" {...field} />
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
                <FloatingLabelInput label="Teléfono de contacto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  )

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="useTw border-border sm:max-w-[32rem]">
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
