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
} from '@/components/lib/alert-dialog'
import { Button } from '@/components/lib/button'
import { IconAlertCircle, IconTrash } from '@tabler/icons-react'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { Alert, AlertDescription, AlertTitle } from '@/components/lib/alert'
import { Input } from '@/components/lib/input'
import { Label } from '@/components/lib/label'

export function DeleteVisitor() {
  const [confirmText, setConfirmText] = useState('')
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedClients,
    deleteSelectedClients,
    usersToDelete,
  } = useClientEditStore()
  console.log(usersToDelete)

  const handleConfirm = () => {
    if (confirmText === 'eliminar-usuarios') {
      deleteSelectedClients()
      setConfirmText('')
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className="useTw border-border gap-6 p-0">
        <AlertDialogHeader className="px-6 pt-6">
          <AlertDialogTitle className="useTw text-2xl font-bold">
            Eliminar {selectedClients.length === 1 ? 'Usuario' : 'Usuarios'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/75 text-pretty">
            Si continuas vas a
            {selectedClients.length === 1
              ? ' eliminar el siguiente usuario, '
              : ` eliminar estos ${selectedClients.length} usuarios, `}
            ¿estás seguro de que deseas
            {selectedClients.length === 1 ? ' eliminarlo?' : ` continuar? `}
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
              <b>Atención:</b> Recuerda que esta acción es irreversible.
            </AlertTitle>
          </Alert>
          <Label className="text-base font-normal">
            Para verificar, escribe aqui: <b>eliminar-usuarios</b>
          </Label>
          <Input
            value={confirmText}
            className="bg-transparent text-white p-6 text-base mt-3"
            onChange={(e) => setConfirmText(e.target.value)}
          ></Input>
        </div>
        <AlertDialogFooter className="px-6 pb-6">
          <AlertDialogCancel
            onClick={() => setIsDeleteDialogOpen(false)}
            className="text-base rounded-md border-border"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={confirmText !== 'eliminar-usuarios'}
            asChild
          >
            <Button variant="destructive" className="flex items-center useTw text-base rounded-md">
              <IconTrash className="mr-1" stroke={1.5} size={16} />
              Borrar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
