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

export function LogsDetailsMenu({ visitor }: any) {
  const { setIsOpen, setClientToEdit, setDialogOpen, setUsersToDelete } = useDashboardStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="useTw w-full rounded-md">
          <IconSettings size={16}></IconSettings>
          Opciones
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 w-56 border border-border rounded-md shadow-xl shadow-black useTw"
        align="end"
      >
        <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-lg">
          Acciones
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            setClientToEdit(visitor)
            setIsOpen(true)
          }}
        >
          <IconEdit className="mr-2" size={15}></IconEdit>
          Editar Usuario
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            setClientToEdit(visitor)
            setDialogOpen(true, 'pincode')
          }}
        >
          <IconRefreshDot className="mr-2" size={15}></IconRefreshDot>
          Cambiar PIN
        </DropdownMenuItem>
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
          onClick={() => {
            setUsersToDelete([
              { id: visitor.id, name: `${visitor.first_name} ${visitor.last_name}` },
            ])
            setDialogOpen(true, 'delete')
          }}
        >
          <IconDownload className="mr-2" size={15}></IconDownload>
          Descargar vídeo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
