'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
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
import { Input } from '../lib/input'
import ClientsSheetDrawer from './ClientsSheetDrawer'
import useDashboardState, { Visitor } from '@/utils/useDashboardState'
import { fetchVisitors, handleDrawerOpen, handleDrawerClose } from '@/utils/DashboardHandlers'
import { Button } from '@/components/lib/button'
import { IconCirclePlus, IconUsers } from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { getClientsTableColumns } from './ClientsTableColumns'

export default function ClientsTable() {
  const { visitors, hasMore, drawerOpenId } = useDashboardState()
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null)
  const [sorting, setSorting] = useState<SortingState>([{ id: 'first_name', desc: true }])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadMoreVisitors = useCallback(async () => {
    if (!loading && hasMore) {
      setLoading(true)
      await fetchVisitors(page + 1, 15)
      setPage((prevPage) => prevPage + 1)
      setLoading(false)
    }
  }, [loading, hasMore, page])

  const lastVisitorElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreVisitors()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, loadMoreVisitors],
  )

  useEffect(() => {
    fetchVisitors(1, 15)
  }, [])

  const handleOpenDrawer = (visitor?: Visitor) => {
    setSelectedVisitor(visitor || null)
    handleDrawerOpen(visitor)
  }

  const handleCloseDrawer = () => {
    setSelectedVisitor(null)
    handleDrawerClose()
  }

  const columns = getClientsTableColumns({ handleOpenDrawer })

  const table = useReactTable({
    data: visitors,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  ref={index === table.getRowModel().rows.length - 1 ? lastVisitorElementRef : null}
                >
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
        {loading && <div>Loading more...</div>}
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
