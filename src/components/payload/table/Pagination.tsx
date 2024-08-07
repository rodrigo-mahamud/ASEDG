import { Table } from '@tanstack/react-table'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { Button } from '@/components/lib/button'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import { Badge } from '@/components/lib/badge'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function Pagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between pt-6">
      <div className="flex items-center space-x-2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-10 w-20">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent
            side="top"
            className="p-1 border border-border rounded-md shadow-xl shadow-black useTw"
          >
            <SelectGroup>
              <SelectLabel>Elementos por página</SelectLabel>
              <SelectSeparator />
              {[25, 50, 75, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-10 w-10 p-0 rounded-md lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft className="h-5 w-5" />
          </Button>
          <Badge
            className="h-10 w-10 rounded-md border-border flex justify-center text-base"
            variant={'outline'}
          >
            {table.getState().pagination.pageIndex + 1}
          </Badge>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="hidden h-10 w-10 p-0 rounded-md lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
