import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Visitor } from '@/utils/useDashboardState'
import { Button, ButtonProps } from '@/components/lib/button'
import { Badge } from '@/components/lib/badge'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import { IconChevronUp, IconChevronDown, IconPencil } from '@tabler/icons-react'
import ClientsBanDropdown from './ClientsBanDropdown'
import { getStatusDetails } from '@/utils/DashboardHandlers'

type ClientsTableColumnsProps = {
  handleOpenDrawer: (visitor: Visitor) => void
}

export const getClientsTableColumns = ({
  handleOpenDrawer,
}: ClientsTableColumnsProps): ColumnDef<Visitor>[] => [
  {
    id: 'avatar',
    cell: ({ row }) => (
      <Avatar className="mx-auto">
        <AvatarFallback>{row.original.first_name[0] + row.original.last_name[0]}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'first_name',
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          {column.getIsSorted() === 'asc' ? (
            <IconChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => <div>{`${row.original.first_name} ${row.original.last_name}`}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const { label, variant } = getStatusDetails(row.original.status)
      return (
        <Badge variant={variant} className="px-3 pt-0.5 pb-1 text-base font-normal rounded-lg ">
          {label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          {column.getIsSorted() === 'asc' ? (
            <IconChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Time
          {column.getIsSorted() === 'asc' ? (
            <IconChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => new Date(row.original.start_time * 1000).toLocaleString(),
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End Time
          {column.getIsSorted() === 'asc' ? (
            <IconChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => new Date(row.original.end_time * 1000).toLocaleString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Button
          className="rounded-md"
          variant="outline"
          size="icon"
          onClick={() => handleOpenDrawer(row.original)}
        >
          <IconPencil className="w-5 h-5" />
        </Button>
        <ClientsBanDropdown visitorId={row.original.id!} />
      </div>
    ),
  },
]
