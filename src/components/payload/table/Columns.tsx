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
import {
  IconArrowsUpDown,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconDots,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import { Badge } from '@/components/lib/badge'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

// Configurar dayjs para usar el locale español
dayjs.locale('es')

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
    case 'visiting':
      return 'bg-green-600/50 text-green-100 border-green-600'
    case 'completed':
      return 'bg-red-600/50 text-red-100 border-red-600'
    case 'no_visit':
      return 'bg-red-600/50 text-red-100 border-red-600'
    case 'visited':
      return 'bg-red-600/50 text-red-100 border-red-600'
    default:
      return 'bg-yellow-600/50 text-yellow-100 border-yellow-600'
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return <IconCircleCheck size={13} stroke={1.5} />
    case 'active':
      return <IconCircleCheck size={13} stroke={1.5} />
    case 'visiting':
      return <IconCircleX size={13} stroke={1.5} />
    case 'completed':
      return <IconCircleX size={13} stroke={1.5} />
    case 'no_visit':
      return <IconCircleX size={13} stroke={1.5} />
    case 'visited':
      return <IconCircleX size={13} stroke={1.5} />
    default:
      return <IconCheck />
  }
}

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    id: 'fullName',
    cell: ({ row }) => {
      const fullName = row.getValue('fullName') as string
      const initials = `${row.original.first_name[0]}${row.original.last_name[0]}`.toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-base font-semibold useTw">{fullName}</h2>
        </div>
      )
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
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={'outline'}
          className={`${getStatusColor(
            status,
          )} rounded-md py-0.5 px-2.5 capitalize flex items-center gap-1 w-fit`}
        >
          {getStatusIcon(status)}
          <span className="text-base font-normal mb-0.5">{status.toLowerCase()}</span>
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
      const timestamp = row.getValue('start_time') as number
      const date = dayjs(timestamp * 1000)
      return <div>{date.format('D, MMMM, YYYY')}</div>
    },
  },
  {
    accessorKey: 'end_time',
    header: 'Fecha de Salida',
    cell: ({ row }) => {
      const timestamp = row.getValue('end_time') as number
      const date = dayjs(timestamp * 1000)
      return <div>{date.format('D, MMMM, YYYY')}</div>
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
              <IconDots size={16} />
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
