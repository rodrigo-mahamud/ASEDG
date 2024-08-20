'use client'
import React, { useState } from 'react'
import { addDays, differenceInMinutes, format } from 'date-fns'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/lib/alert-dialog'
import { Button } from '@/components/lib/button'
import { IconLoader2 } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { handleDoor } from '@/utils/dashboard/data'
import { DoorOperation } from '@/utils/dashboard/types'
import { toast } from '@payloadcms/ui'
export function CloseConfirm() {
  const { isDialogOpen, setDialogOpen, dialogType } = useDashboardStore()
  const [isSaving, setIsSaving] = useState(false)

  const openCloseDoor = async (type: DoorOperation, time?: number) => {
    const result = await handleDoor(type, time)
    if (result.success) {
      toast.success(result.actionMessage)
    } else {
      toast.error(result.message)
    }
  }
  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'closeConfirmation'}
      onOpenChange={() => setDialogOpen(false, 'closeConfirmation')}
    >
      <AlertDialogContent className="useTw border-border gap-10 p-6 w-full max-w-xl">
        <AlertDialogHeader>
          <h2 className="useTw text-2xl font-semibold">Cerrar instalación</h2>
          <p className="text-base text-white/85 text-pretty">
            La instalación permanecerá cerrada durante el período seleccionado, omitiendo el horario
            convencional.
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            variant={'outline'}
            onClick={() => setDialogOpen(false, 'closeConfirmation')}
            className="text-base rounded-md border-border h-full"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            disabled={isSaving}
            onClick={() => openCloseDoor('close')}
            className="flex items-center text-base font-semibold rounded-md leading-none"
          >
            {isSaving ? (
              <IconLoader2 stroke={1.5} className="animate-spin mr-1 size-4" />
            ) : (
              <>Cerrar Instalación</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
