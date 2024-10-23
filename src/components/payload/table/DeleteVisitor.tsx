'use client'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconAlertCircle, IconTrash } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { deleteVisitors } from '@/utils/dashboard/actions'
import { toast } from '@payloadcms/ui'
export function DeleteVisitor() {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { isDialogOpen, setDialogOpen, selectedClients, usersToDelete, dialogType } =
    useDashboardStore()

  const handleConfirm = async () => {
    if (confirmText === 'eliminar-usuarios') {
      setIsDeleting(true)
      try {
        await deleteVisitors(usersToDelete.map((user) => user.id))
        setDialogOpen(false, 'delete')
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

  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'delete'}
      onOpenChange={() => setDialogOpen(false, 'delete')}
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
          <Input
            value={confirmText}
            className="bg-transparent text-white p-6 text-base mt-3"
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <AlertDialogFooter className="px-6 pb-6">
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'delete')}
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
