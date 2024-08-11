import { Visitor } from '@/utils/dashboard/types'
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
import {
  IconClipboard,
  IconDeviceMobile,
  IconDots,
  IconEdit,
  IconMail,
  IconPencil,
  IconRefreshDot,
  IconTrash,
} from '@tabler/icons-react'
import { toast } from '@payloadcms/ui'

export default function ActionsTable({ visitor }: { visitor: Visitor }) {
  const { setIsOpen, setClientToEdit, setDialogOpen, setUsersToDelete } = useDashboardStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="m-2">
        <Button variant="ghost" className="h-10 w-10 p-2 rounded-md">
          <span className="sr-only">Open menu</span>
          <IconDots size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 w-44 border border-border rounded-md shadow-xl shadow-black useTw"
        align="end"
      >
        <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-base">
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
          <IconEdit className="mr-2" size={14}></IconEdit>
          Editar Usuario
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            setClientToEdit(visitor)
            setDialogOpen(true, 'pincode')
          }}
        >
          <IconRefreshDot className="mr-2" size={14}></IconRefreshDot>
          Cambiar PIN
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(visitor.email)
            toast.info('Emial copiado al portapapeles')
          }}
        >
          <IconMail className="mr-2" size={14}></IconMail>
          Copiar Email
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(visitor.mobile_phone)
            toast.info('Teléfono copiado al portapapeles')
          }}
        >
          <IconDeviceMobile className="mr-2" size={14}></IconDeviceMobile>
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
          <IconTrash className="mr-2" size={14}></IconTrash>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
