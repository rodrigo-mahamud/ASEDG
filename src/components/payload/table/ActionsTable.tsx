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
  const { setIsOpen, setClientToEdit } = useClientEditStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IconDots size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.id)}>
          Copy visitor ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setClientToEdit(visitor)
            setIsOpen(true)
          }}
        >
          Edit visitor
        </DropdownMenuItem>
        <DropdownMenuItem>View visitor details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
