'use client'
import { Visitor } from '@/utils/dashboard/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/lib/button'
import { IconArrowsUpDown, IconCheck, IconCircleCheck, IconCircleX } from '@tabler/icons-react'
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
      return <IconCheck />
  }
}
const parseRemarks = (remarks: string): { age: string; dni: string; acceptedTerms: boolean } => {
  const [age, dni, terms] = remarks.split(';')
  return {
    age,
    dni,
    acceptedTerms: terms === '1',
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
          <h2 className="text-base font-semibold line-clamp-1 useTw">{fullName}</h2>
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
        <a href={`mailto:${email}`} target="_blank" rel="nofollow noopener">
          {email}
        </a>
      )
    },
  },
  {
    accessorKey: 'mobile_phone',
    header: 'Teléfono de contacto',
  },
  {
    accessorKey: 'start_time',
    header: 'Inicio de Reserva',
    cell: ({ row }) => {
      const timestamp = row.getValue('start_time') as number
      const date = dayjs(timestamp * 1000)
      return <div>{date.format('D, MMMM, YYYY')}</div>
    },
  },
  {
    accessorKey: 'end_time',
    header: 'Fin de Reserva',
    cell: ({ row }) => {
      const timestamp = row.getValue('end_time') as number
      const date = dayjs(timestamp * 1000)
      return <div>{date.format('D, MMMM, YYYY')}</div>
    },
  },
  {
    accessorFn: (row) => parseRemarks(row.remarks).dni,
    id: 'dni',
    header: 'DNI',
    cell: ({ row }) => {
      const remarks = row.original.remarks
      const { dni } = parseRemarks(remarks)
      return <div>{dni}</div>
    },
  },
  {
    accessorFn: (row) => parseRemarks(row.remarks).age,
    id: 'age',
    header: 'Edad',
    cell: ({ row }) => {
      const remarks = row.original.remarks
      const { age } = parseRemarks(remarks)
      return <div>{age} Años</div>
    },
  },
  {
    accessorFn: (row) => parseRemarks(row.remarks).acceptedTerms,
    id: 'acceptedTerms',
    header: 'Términos',
    cell: ({ row }) => {
      const remarks = row.original.remarks
      const { acceptedTerms } = parseRemarks(remarks)
      return (
        <Badge variant={acceptedTerms ? 'success' : 'destructive'}>
          {acceptedTerms ? 'Aceptados' : 'No aceptados'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsTable visitor={row.original} />,
  },
]
