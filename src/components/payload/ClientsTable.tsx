'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/lib/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/lib/table'
import { Badge } from '@/components/lib/badge'
import { Input } from '../lib/input'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import ClientsSheetDrawer from './ClientsSheetDrawer'
import ClientsBanDropdown from './ClientsBanDropdown'
import useDashboardState from '@/utils/useDashboardState'
import { fetchVisitors, handleDrawerOpen, handleDrawerClose } from '@/utils/DashboardHandlers'
import { Button } from '@/components/lib/button'
import {
  IconCirclePlus,
  IconPencil,
  IconUsers,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'

interface Visitor {
  id: string
  first_name: string
  last_name: string
  status: string
  email: string
  start_time: number
  end_time: number
}

export default function ClientsTable() {
  const { visitors, drawerOpenId } = useDashboardState()
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    fetchVisitors()
  }, [])

  const handleOpenDrawer = (visitor?: any) => {
    setSelectedVisitor(visitor)
    handleDrawerOpen(visitor)
  }

  const handleCloseDrawer = () => {
    setSelectedVisitor(null)
    handleDrawerClose()
  }

  const columns: ColumnDef<Visitor>[] = [
    {
      accessorKey: 'first_name',
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
      header: 'Status',
      cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
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
          <ClientsBanDropdown visitorId={row.original.id} />
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: visitors,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <Card className="border border-white/15 p-8">
      <CardHeader className="h-1/4 flex flex-row justify-between w-full p-0 ">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-3xl">Visitors</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Manage your visitors and view their details.
          </CardDescription>
        </div>
        <div className="rounded-full border-border border w-12 h-12 p-3.5 aspect-square">
          <IconUsers className="w-full h-full "></IconUsers>
        </div>
      </CardHeader>
      <CardContent className="h-3/4 p-0 mt-8 space-y-6">
        <div className="flex justify-between">
          <Input
            placeholder={`Buscar usuario...`}
            className="w-full px-6 h-auto py-3 md:max-w-sm text-base hover:bg-accent hover:text-accent-foreground"
          />
          <Button
            className="rounded-md w-auto px-6 h-auto py-3 text-base"
            variant="outline"
            size="icon"
            onClick={() => handleOpenDrawer()}
          >
            <IconCirclePlus className="w-5 h-5 mr-2" /> Añadir
          </Button>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">Total visitors: {visitors.length}</div>
      </CardFooter>
      <ClientsSheetDrawer
        isOpen={drawerOpenId !== null}
        onOpenChange={(open) => {
          if (!open) handleCloseDrawer()
        }}
        visitor={selectedVisitor}
      />
    </Card>
  )
}
