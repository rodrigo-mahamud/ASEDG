'use client'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/lib/sheet'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/lib/drawer'
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
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { addVisitor, updateVisitor } from '@/utils/dashboard/data'
import { visitorSchema, VisitorFormValues } from '@/utils/dashboard/validationSchema'
import { toast } from '@payloadcms/ui'

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
    },
  })

  useEffect(() => {
    if (clientToEdit) {
      form.reset(clientToEdit)
    } else {
      form.reset({
        first_name: '',
        last_name: '',
        email: '',
        dni: '',
        age: '',
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
      let result
      if (data.id) {
        // Si hay un ID, estamos editando un visitante existente
        result = await updateVisitor(data)
      } else {
        // Si no hay ID, estamos añadiendo un nuevo visitante
        const currentTime = Math.floor(Date.now() / 1000)
        const oneYearFromNow = currentTime + 365 * 24 * 60 * 60
        result = await addVisitor({
          ...data,
          start_time: currentTime,
          end_time: oneYearFromNow,
        })
      }
      if (result.success) {
        handleClose()
        toast.success('Añadido correctamente')
      }
    } catch (error) {
      toast.error('No se ha podido añadir al usuario intentalo de nuevo mas tarde.')
    }
  }

  const Content = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="DNI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad</FormLabel>
              <FormControl>
                <Input placeholder="Edad" type="number" {...field} />
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
