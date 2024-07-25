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
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { IconDots } from '@tabler/icons-react'

export default function ActionsTable({ visitor }: { visitor: Visitor }) {
  const { setIsOpen, setClientToEdit, setIsDeleteDialogOpen, setUsersToDelete } =
    useClientEditStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="m-2">
        <Button variant="ghost" className="h-10 w-10 p-2 rounded-md">
          <span className="sr-only">Open menu</span>
          <IconDots size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.mobile_phone)}>
          copiar telefono
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setClientToEdit(visitor)
            setIsOpen(true)
          }}
        >
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setUsersToDelete([
              { id: visitor.id, name: `${visitor.first_name} ${visitor.last_name}` },
            ])
            setIsDeleteDialogOpen(true)
          }}
        >
          Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem>View visitor details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
