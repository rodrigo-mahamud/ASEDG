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
import { IconLoader2, IconRefresh } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { generatePinCode, sendEmail, updateVisitor } from '@/utils/dashboard/data'
import { toast } from '@payloadcms/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pinCodeSchema, VisitorFormValues, visitorSchema } from '@/utils/dashboard/validationSchema'
import { Textarea } from '@/components/lib/textarea'

export function ReportMail() {
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
        await sendEmail(visitorData, 'report')
        toast.success('Código PIN actualizado correctamenteee')
        setDialogOpen(false, 'report')
      } catch (error) {
        console.error('Error updating visitor:', error)
        toast.error('Ha ocurrido un error al enviar el nuevo pin')
      } finally {
        setIsSaving(false)
      }
    }
  }

  useEffect(() => {
    if (isDialogOpen && dialogType === 'report') {
      handleGeneratePin()
    }
  }, [isDialogOpen, dialogType, handleGeneratePin])

  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'report'}
      onOpenChange={() => setDialogOpen(false, 'report')}
    >
      <AlertDialogContent className="useTw border-border gap-10 p-6 w-full max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="useTw text-2xl font-semibold">
            Reportar incidencia por Email.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/85 text-pretty">
            Se generará un nuevo codigo pin para {clientToEdit?.first_name} y se le notificará por
            correo electrónico.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Textarea placeholder="Type your message here." />

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'report')}
            className="text-base rounded-md border-border"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(handleSave)} asChild>
            <Button
              type="button"
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
