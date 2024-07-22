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
import { Input } from '@/components/lib/input'

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemCount: number
}

export function DeleteVisitor({
  isOpen,
  onClose,
  onConfirm,
  itemCount,
}: DeleteConfirmationDialogProps) {
  const [confirmText, setConfirmText] = useState('')

  const handleConfirm = () => {
    if (confirmText === 'BORRAR') {
      onConfirm()
      setConfirmText('')
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se borrarán permanentemente {itemCount}{' '}
            {itemCount === 1 ? 'visitante' : 'visitantes'} seleccionados de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <Input
            placeholder="Escribe BORRAR para confirmar"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={confirmText !== 'BORRAR'}>
            Borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
