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
import { IconTrash } from '@tabler/icons-react'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'

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
    if (confirmText === 'BORRAR') {
      deleteSelectedClients()
      setConfirmText('')
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className="useTw border-border ">
        <AlertDialogHeader>
          <AlertDialogTitle className="useTw text-xl">
            Eliminar {selectedClients.length === 1 ? 'Usuario' : 'Usuarios'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/75">
            Estás seguro de que deseas eliminar a:
            <ul className="list-disc pl-5 mt-2 max-h-64 overflow-y-auto">
              {usersToDelete.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            Se borrarán permanentemente {selectedClients.length}{' '}
            {selectedClients.length === 1 ? 'visitante' : 'visitantes'} seleccionados de la base de
            datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 bg-onTop ">
          <FloatingLabelInput
            label="Escribe BORRAR para confirmar"
            value={confirmText}
            className="bg-transparent text-white/50"
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsDeleteDialogOpen(false)}
            className="text-base rounded-md border-border"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={confirmText !== 'BORRAR'} asChild>
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
