'use client'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
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
import { Calendar } from '@/components/lib/calendar'
export function OpenCloseCustom() {
  const [isGeneratingPin, setIsGeneratingPin] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { isDialogOpen, setDialogOpen, dialogType, clientToEdit } = useDashboardStore()
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <AlertDialog
      open={isDialogOpen && dialogType === 'openClose'}
      onOpenChange={() => setDialogOpen(false, 'openClose')}
    >
      <AlertDialogContent className="useTw border-border gap-10 p-6 w-full max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="useTw text-2xl font-semibold">
            Cerrar instalaccion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-white/85 text-pretty">
            Se generará un nuevo codigo pin para {clientToEdit?.first_name} y se le notificará por
            correo electrónico.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Calendar
          initialFocus
          mode="range"
          className="w-full"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialogOpen(false, 'openClose')}
            className="text-base rounded-md border-border h-full"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="default"
              disabled={isGeneratingPin || isSaving}
              className="flex items-center text-base font-semibold rounded-md leading-none"
            >
              {isGeneratingPin || isSaving ? (
                <IconLoader2 stroke={1.5} className="animate-spin mr-1 size-4" />
              ) : (
                <>Cerrar durante </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
