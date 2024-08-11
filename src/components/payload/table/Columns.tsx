'use client'
import { Visitor } from '@/utils/dashboard/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/lib/button'
import {
  IconArrowsUpDown,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconExternalLink,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import { Badge } from '@/components/lib/badge'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import ActionsTable from './ActionsTable'

dayjs.locale('es')

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'bg-blue-600/50 text-blue-100 border-blue-600'
    case 'active':
      return 'bg-green-600/20 text-green-100/90 border-green-600/30'
    case 'visiting':
      return 'bg-green-600/50 text-green-100 border-green-600'
    case 'completed':
      return 'bg-red-600/20 text-red-100 border-red-600/30'
    case 'no_visit':
      return 'bg-red-600/20 text-red-100 border-red-600/30'
    case 'visited':
      return 'bg-red-600/20 text-red-100 border-red-600/30'
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
      return <IconCheck size={13} stroke={1.5} />
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
          <h2 className="text-base font-semibold line-clamp-1 max-w-48 useTw">{fullName}</h2>
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
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      return (
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="nofollow noopener"
          className="flex gap-1 items-center hover:underline"
        >
          {email}
          <IconExternalLink size={14}></IconExternalLink>
        </a>
      )
    },
  },
  {
    accessorKey: 'mobile_phone',
    header: 'Teléfono ',
  },
  {
    accessorFn: (row) => `${row.start_time}-${row.end_time}`,
    id: 'periodo',
    header: 'Periodo',
    cell: ({ row }) => {
      const startTime = dayjs(row.original.start_time * 1000)
      const endTime = dayjs(row.original.end_time * 1000)
      return (
        <div>
          {startTime.format('DD/MM/YY')} - {endTime.format('DD/MM/YY')}
        </div>
      )
    },
  },
  {
    accessorKey: 'dni',
    id: 'dni',
    header: 'DNI',
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Edad',
  },
  {
    accessorKey: 'terms',
    id: 'terms',
    header: 'Términos',
    cell: ({ row }) => {
      const terms = row.getValue('terms') as boolean
      return (
        <div className="flex items-center justify-center">
          {terms ? (
            <IconCircleCheck size={22} stroke={1.5} className="text-green-600"></IconCircleCheck>
          ) : (
            <IconCircleX size={22} stroke={1.5} className="text-red-600"></IconCircleX>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsTable visitor={row.original} />,
  },
]
