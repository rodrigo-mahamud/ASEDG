'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/lib/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { IconArrowsMoveHorizontal, IconArrowsUpDown } from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import { Badge } from '@/components/lib/badge'

export type Visitor = {
  id: string
  first_name: string
  last_name: string
  email: string
  start_time: number
  end_time: number
  status: string
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'bg-blue-600/50 text-blue-100 border-blue-600'
    case 'active':
      return 'bg-green-600/50 text-green-100 border-green-600'
    case 'completed':
      return 'bg-red-600/50 text-red-100 border-red-600'
    default:
      return 'bg-yellow-600/50 text-yellow-100 border-yellow-600'
  }
}

export const columns: ColumnDef<Visitor>[] = [
  {
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const visitor = row.original
      const initials = `${visitor.first_name[0]}${visitor.last_name[0]}`.toUpperCase()
      return (
        <Avatar>
          <AvatarFallback className="font-bold">{initials}</AvatarFallback>
        </Avatar>
      )
    },
  },

  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    id: 'fullName',
    cell: ({ row }) => {
      const fullName = row.getValue('fullName') as string
      return <h2 className="text-base font-semibold useTw">{fullName}</h2>
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={'outline'}
          className={`${getStatusColor(status)} rounded-md pt-0.5 pb-1 px-2.5 capitalize`}
        >
          {status.toLowerCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'start_time',
    header: 'Fecha de Entrada',
    cell: ({ row }) => {
      const date = new Date((row.getValue('start_time') as number) * 1000)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'end_time',
    header: 'Fecha de Salida',
    cell: ({ row }) => {
      const date = new Date((row.getValue('end_time') as number) * 1000)
      return <div>{date.toLocaleDateString()}</div>
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const visitor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconArrowsMoveHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.id)}>
              Copy visitor ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View visitor details</DropdownMenuItem>
            <DropdownMenuItem>Edit visitor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
