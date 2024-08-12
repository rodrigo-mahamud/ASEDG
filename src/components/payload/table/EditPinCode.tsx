'use client'
import { useCallback, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/lib/alert-dialog'
import { Button } from '@/components/lib/button'
import { IconCircleCheck, IconLoader2, IconRefresh } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { generatePinCode, sendEmail, updateVisitor } from '@/utils/dashboard/data'
import { toast } from '@payloadcms/ui'
import { Form, FormControl, FormField, FormItem } from '@/components/lib/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pinCodeSchema, VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { FormErrors } from './FormErrors'

export function EditPinCode() {
  const [isGeneratingPin, setIsGeneratingPin] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { isDialogOpen, setDialogOpen, dialogType, clientToEdit } = useDashboardStore()

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(pinCodeSchema),
    mode: 'onChange',
    defaultValues: {
      pin_code: '',
    },
  })

  const handleGeneratePin = useCallback(async () => {
    setIsGeneratingPin(true)
    try {
      const result = await generatePinCode()
      if (result.success) {
        form.setValue('pin_code', result.pinCode)
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

  const handleSave = async (data: VisitorFormValues) => {
    console.log('hola me has clickado')

    if (clientToEdit && data.pin_code) {
      setIsSaving(true)
      try {
        await updateVisitor({ ...clientToEdit, pin_code: data.pin_code })
        const visitorData = {
          first_name: clientToEdit.first_name,
          last_name: clientToEdit.last_name,
          email: clientToEdit.email,
          pin_code: data.pin_code,
        }
        await sendEmail(visitorData, 'pinCode')
        toast.success('Código PIN actualizado correctamente')
        setDialogOpen(false, 'pincode')
      } catch (error) {
        console.error('Error updating visitor:', error)
        toast.error('Ha ocurrido un error al enviar el nuevo pin')
      } finally {
        setIsSaving(false)
      }
    }
  }

  useEffect(() => {
    if (isDialogOpen && dialogType === 'pincode') {
      handleGeneratePin()
    }
  }, [isDialogOpen, dialogType, handleGeneratePin])

  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'pincode'}
      onOpenChange={() => setDialogOpen(false, 'pincode')}
    >
      <AlertDialogContent className="useTw border-border gap-10 p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="useTw text-2xl font-semibold">
            Nuevo código de acceso
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/85 text-pretty">
            Se generará un nuevo codigo pin para {clientToEdit?.first_name} y se le notificará por
            correo electrónico.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="">
            <div className="flex w-full h-full">
              <FormField
                control={form.control}
                name="pin_code"
                render={({ field }) => (
                  <FormItem className="w-5/6">
                    <FormControl>
                      <FloatingLabelInput
                        className="text-base py-3 h-fit border-r-0 rounded-r-none leading-none"
                        label="Nuevo Código PIN"
                        disabled={true}
                        {...field}
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
                className="w-1/6 py-3 bg-onTop text-base rounded-r-md h-full"
              >
                {isGeneratingPin ? (
                  <IconLoader2 size={16} className="animate-spin" />
                ) : (
                  <IconRefresh size={16} />
                )}
              </Button>
            </div>
            <FormErrors form={form} />
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'pincode')}
            className="text-base rounded-md border-border"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="submit"
              variant="default"
              disabled={isGeneratingPin || isSaving}
              className="flex items-center text-base font-semibold rounded-md leading-none"
            >
              {isGeneratingPin || isSaving ? (
                <IconLoader2 stroke={1.5} className="animate-spin mr-1 size-4" />
              ) : (
                <>Confirmar</>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
