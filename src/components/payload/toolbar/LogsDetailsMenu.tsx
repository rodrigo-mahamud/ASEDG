'use client'
import {
  IconSettings,
  IconDeviceMobile,
  IconEdit,
  IconMail,
  IconRefreshDot,
  IconTrash,
  IconUserExclamation,
  IconUserOff,
  IconDownload,
  IconLeaf,
  IconAdjustmentsHorizontal,
  IconDots,
} from '@tabler/icons-react'

import { Button } from '@/components/lib/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { toast } from '@payloadcms/ui'

export function LogsDetailsMenu({ visitor, handleVideoDownload }: any) {
  const { setClientToEdit, setDialogOpen, setUsersToDelete } = useDashboardStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="useTw w-full border-x-0">
          <IconDots size={16}></IconDots>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 w-56 border border-border rounded-md shadow-lg shadow-black/50 useTw"
        align="end"
      >
        <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-lg">
          Opciones
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            setClientToEdit(visitor)
            setDialogOpen(true, 'report')
          }}
        >
          <IconUserExclamation className="mr-2" size={15}></IconUserExclamation>
          Reportar Incidencia
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            setClientToEdit(visitor)
            setDialogOpen(true, 'ban')
          }}
        >
          <IconUserOff className="mr-2" size={15}></IconUserOff>
          Banear usuarío
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(visitor.email)
            toast.info('Emial copiado al portapapeles')
          }}
        >
          <IconMail className="mr-2" size={15}></IconMail>
          Copiar Email
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(visitor.mobile_phone)
            toast.info('Teléfono copiado al portapapeles')
          }}
        >
          <IconDeviceMobile className="mr-2" size={15}></IconDeviceMobile>
          Copiar teléfono
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize hover:bg-red-600/25 hover:text-red-600 text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => handleVideoDownload()}
        >
          <IconDownload className="mr-2" size={15}></IconDownload>
          Descargar vídeo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
