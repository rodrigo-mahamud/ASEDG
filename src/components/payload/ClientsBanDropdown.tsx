import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/lib/dropdown-menu'
import { Button } from '../lib/button'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

export default function ClientsBanDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-md" aria-haspopup="true" size="icon" variant="outline">
          <IconTrash className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
