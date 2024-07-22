'use client'

import { useState } from 'react'

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/lib/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { Button } from '@/components/lib/button'
import { Input } from '@/components/lib/input'
import { Pagination } from './Pagination'
import { IconAdjustmentsHorizontal, IconEye, IconSettings, IconUserPlus } from '@tabler/icons-react'
import { DropdownMenuLabel, Separator } from '@radix-ui/react-dropdown-menu'
import { SelectSeparator } from '@/components/lib/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { setIsOpen, setClientToEdit } = useClientEditStore()

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      {/* Filters */}

      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Input
            placeholder="Buscar por nombre..."
            value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('fullName')?.setFilterValue(event.target.value)}
            className="w-80"
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="ml-auto rounded-md border-border text-base"
            onClick={() => {
              setClientToEdit(null)
              setIsOpen(true)
            }}
          >
            <IconUserPlus className="mr-2" stroke={1.5} size={16} />
            Añadir
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto rounded-md border-border text-base ">
                <IconAdjustmentsHorizontal className="mr-2 " stroke={1.5} size={16} />
                Ver
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="p-1 w-44 border border-border rounded-md shadow-xl shadow-black useTw"
              align="end"
            >
              <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-base">
                Mostrar columnas
              </DropdownMenuLabel>
              <SelectSeparator></SelectSeparator>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-border" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-border"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-base useTw" key={cell.id}>
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
      </div>

      <Pagination table={table} />
    </>
  )
}
