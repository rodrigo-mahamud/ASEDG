'use client'
import { useCallback, useRef, useState } from 'react'
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
import { IconAlertCircle, IconLoader2, IconRefresh, IconTrash } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { Alert, AlertTitle } from '@/components/lib/alert'
import { Input } from '@/components/lib/input'
import { Label } from '@/components/lib/label'
import { deleteVisitors, generatePinCode } from '@/utils/dashboard/data'
import { toast } from '@payloadcms/ui'
import { Form, FormControl, FormField, FormItem } from '@/components/lib/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { visitorSchema } from '@/utils/dashboard/validationSchema'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
export function EditPinCode() {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { isDialogOpen, setDialogOpen, selectedClients, usersToDelete, dialogType } =
    useDashboardStore()

  const handleConfirm = async () => {
    if (confirmText === 'eliminar-usuarios') {
      setIsDeleting(true)
      try {
        await deleteVisitors(usersToDelete.map((user) => user.id))
        setDialogOpen(false, 'pincode')
      } catch (error) {
        console.error('Error deleting visitors:', error)
        toast.error('Ha ocurrido un error al eliminar el usuario')
      } finally {
        setIsDeleting(false)
        toast.success('Usuario eliminado correctamente')
        setConfirmText('')
      }
    }
  }
  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    mode: 'onChange',
    defaultValues: [],
  })
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

  const [isGeneratingPin, setIsGeneratingPin] = useState(false)
  const [pinCodeChanged, setPinCodeChanged] = useState(false)
  const initialPinGeneratedRef = useRef(false)
  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'pincode'}
      onOpenChange={() => setDialogOpen(false, 'pincode')}
    >
      <AlertDialogContent className="useTw border-border gap-6 p-0">
        <AlertDialogHeader className="px-6 pt-6">
          <AlertDialogTitle className="useTw text-2xl font-semibold">
            Eliminar {selectedClients.length === 1 ? 'Visitante' : 'Visitantes'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/85 text-pretty">
            ¿Estás seguro de que deseas eliminar{' '}
            {selectedClients.length === 1
              ? 'al siguiente visitante'
              : `a los siguientes ${selectedClients.length} visitantes`}
            ?
            <ul className="pl-0 mt-4 mb-0 max-h-44 overflow-y-auto font-semibold text-white space-y-2">
              {usersToDelete.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-onTop p-6 border-y border-border">
          <Alert variant="destructive" className="flex items-start p-3 mb-6">
            <IconAlertCircle size={16} className="mr-2 mt-1 w-1/9" />
            <AlertTitle className="mr-1 mb-0 text-base font-normal w-full">
              <b>Atención:</b> Esta acción es irreversible.
            </AlertTitle>
          </Alert>
          <Label className="text-base font-normal">
            Para confirmar, escribe: <b>eliminar-usuarios</b>
          </Label>
          <Form {...form}>
            <form onSubmit={form.handleSubmit('a')} className="mt-6">
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="pin_code"
                  render={({ field }) => (
                    <FormItem className="w-4/5">
                      <FormControl>
                        <FloatingLabelInput
                          className="text-base py-3 h-fit border-r-0 rounded-r-none "
                          label="Nuevo Código PIN"
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
            </form>
          </Form>
        </div>
        <AlertDialogFooter className="px-6 pb-6">
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'pincode')}
            className="text-base rounded-md border-border"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={confirmText !== 'eliminar-usuarios' || isDeleting}
            asChild
          >
            <Button variant="destructive" className="flex items-center useTw text-base rounded-md">
              <IconTrash className="mr-1" stroke={1.5} size={16} />
              {isDeleting ? 'Borrando...' : 'Borrar'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
