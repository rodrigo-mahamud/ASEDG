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
import { reportReason, ReportReasonTypes } from '@/utils/dashboard/validationSchema'
import { Textarea } from '@/components/lib/textarea'
import { Form, FormControl, FormField, FormItem } from '@/components/lib/form'
import { FormErrors } from './FormErrors'

export function BanUser() {
  const [isGeneratingPin, setIsGeneratingPin] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { isDialogOpen, setDialogOpen, dialogType, clientToEdit } = useDashboardStore()

  const form = useForm<ReportReasonTypes>({
    resolver: zodResolver(reportReason),
    mode: 'onSubmit',
    defaultValues: {
      report_reason: '',
    },
  })

  const handleSave = async (data: ReportReasonTypes) => {
    console.log('hola me has clickado')

    if (clientToEdit && data.report_reason) {
      setIsSaving(true)
      try {
        const visitorData = {
          first_name: clientToEdit.first_name,
          last_name: clientToEdit.last_name,
          email: clientToEdit.email,
          report_reason: data.report_reason,
        }
        await sendEmail(visitorData, 'ban')
        toast.success('Mensaje de incidencia enviado')
        setDialogOpen(false, 'ban')
      } catch (error) {
        console.error('Error updating visitor:', error)
        toast.error('Ha ocurrido un error al enviar el nuevo pin')
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'ban'}
      onOpenChange={() => setDialogOpen(false, 'ban')}
    >
      <AlertDialogContent className="useTw border-border gap-10 p-6 w-full max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="useTw text-2xl font-semibold">
            Banear a {clientToEdit?.first_name} {clientToEdit?.last_name}.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/85 text-pretty">
            Se eliminara a {clientToEdit?.first_name} retirando su acceso a las instalacciones y se
            le notificará el motivo del baneo por correo electrónico.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form>
            <div className="flex w-full h-full">
              <FormField
                control={form.control}
                name="report_reason"
                render={({ field }) => (
                  <FormItem className="w-full !focus-visible:ring-offset-0">
                    <FormControl>
                      <Textarea className="text-base" placeholder="Motivo del baneo." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormErrors form={form} />
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'ban')}
            className="text-base rounded-md border-border h-full"
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
