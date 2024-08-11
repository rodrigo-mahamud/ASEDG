import { Table } from '@tanstack/react-table'
import { Input } from '@/components/lib/input'
import { Button } from '@/components/lib/button'
import { Badge } from '@/components/lib/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { SelectSeparator } from '@/components/lib/select'
import { IconAdjustmentsHorizontal, IconUserPlus, IconTrash } from '@tabler/icons-react'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import { Visitor } from '@/utils/dashboard/types'

interface ToolbarTableProps {
  table: Table<Visitor>
}

export function ToolbarTable({ table }: ToolbarTableProps) {
  const { setIsOpen, setClientToEdit, setDialogOpen } = useDashboardStore()

  return (
    <div className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Buscar por nombre..."
          value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('fullName')?.setFilterValue(event.target.value)}
          className="w-80 text-base"
        />
        <Badge
          variant={'outline'}
          className={
            table.getFilteredSelectedRowModel().rows.length === 0
              ? 'hidden'
              : 'text-muted-foreground px-4 py-2 rounded-md border-border flex justify-center text-base'
          }
        >
          {table.getFilteredSelectedRowModel().rows.length} usuarios seleccionados.
        </Badge>
        <div className="flex-1 text-sm text-muted-foreground"></div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className={
            table.getFilteredSelectedRowModel().rows.length === 0
              ? 'opacity-0'
              : 'ml-auto rounded-md border-border text-base'
          }
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          <IconTrash className="mr-2" stroke={1.5} size={16} />
          Borrar
        </Button>
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
            <Button variant="outline" className="ml-auto rounded-md border-border text-base">
              <IconAdjustmentsHorizontal className="mr-2" stroke={1.5} size={16} />
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
  )
}
