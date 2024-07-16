import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/lib/dropdown-menu'
import { Button } from '../lib/button'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import useDashboardState from '@/utils/useDashboardState'
import {
  handleDropdownOpen,
  handleDropdownClose,
  handleDeleteConfirm,
} from '@/utils/DashboardHandlers'

interface ClientsBanDropdownProps {
  visitorId: string
}

export default function ClientsBanDropdown({ visitorId }: ClientsBanDropdownProps) {
  const { isDropdownOpen } = useDashboardState()

  return (
    <DropdownMenu
      open={isDropdownOpen}
      onOpenChange={(isOpen) => (isOpen ? handleDropdownOpen(visitorId) : handleDropdownClose())}
    >
      <DropdownMenuTrigger asChild>
        <Button className="rounded-md" aria-haspopup="true" size="icon" variant="outline">
          <IconTrash className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuItem onClick={handleDeleteConfirm}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
