'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/lib/form'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'
import { Button } from '@/components/lib/button'
import { addVisitor, updateVisitor } from '@/utils/dashboard/data'
import { defaultValues, VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { AddEditDatePicker } from './AddEditDatePicker'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { toast } from '@payloadcms/ui'
export default function AddEditForm() {
  const { clientToEdit, setIsOpen } = useClientEditStore()

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onBlur',
    defaultValues: clientToEdit || defaultValues,
  })

  const handleSave = async (data: VisitorFormValues) => {
    if (clientToEdit) {
      try {
        await updateVisitor({ ...data })
        setIsOpen(false)
      } catch (error) {
        console.error('Error deleting visitors:', error)
        toast.error('Ha ocurrido un error al editatar el usuario')
      } finally {
        toast.success('Usuario editado correctamente')
      }
    }
    if (!clientToEdit) {
      try {
        await addVisitor({ ...data })
        setIsOpen(false)
      } catch (error) {
        console.error('Error deleting visitors:', error)
        toast.error('Ha ocurrido un error al añadir al usuario')
      } finally {
        toast.success('Usuario añadido correctamente')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className=" mt-6">
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
              <AddEditDatePicker
                field={{
                  value: {
                    start_time: form.getValues().start_time,
                    end_time: form.getValues().end_time,
                  },
                  onChange: (value) => {
                    form.setValue('start_time', value.start_time)
                    form.setValue('end_time', value.end_time)
                  },
                }}
              />
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
}
