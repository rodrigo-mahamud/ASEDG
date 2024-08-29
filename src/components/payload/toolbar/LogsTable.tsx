import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/lib/table'
import { getActivityLogs } from '@/utils/dashboard/actions'
import { LogsTypes, Column, FormattedLog } from '@/utils/dashboard/types'
import { LogsDetails } from './LogsDetails'
import { IconDisplay } from '@/components/IconDisplay'
import { formatLogData } from '@/utils/dashboard/logsTableFormat'
import { Badge } from '@/components/lib/badge'

const COLUMNS: Column[] = [
  { key: 'timestamp', label: 'Fecha' },
  { key: 'userName', label: 'Usuario' },
  { key: 'userType', label: 'Tipo de usuario' },
  { key: 'action', label: 'Acción' },
  { key: 'details', label: 'Detalles' },
]

const formatCellContent = (
  key: string,
  value: any,
  log: FormattedLog,
  logs: FormattedLog[],
  index: number,
): React.ReactNode => {
  switch (key) {
    case 'action':
      return (
        <Badge variant={value.variant} className="flex items-center gap-1 w-fit px-3 py-1 ">
          <IconDisplay iconName={value.icon} size={14} />
          <span className="leading-none text-sm font-normal">{value.text}</span>
        </Badge>
      )
    case 'details':
      return <LogsDetails log={log} logs={logs} currentIndex={index} />
    // Puedes agregar más casos aquí para otros tipos de celdas
    default:
      return value
  }
}

export async function LogsTable() {
  const logs: LogsTypes = await getActivityLogs('week', 'all')

  if (!logs || logs.raw.length === 0) {
    return <p>No hay registros disponibles.</p>
  }

  const formattedLogs = logs.raw.map(formatLogData)

  return (
    <div className="rounded-md border border-border">
      <Table className="block w-full max-h-[45rem] overflow-y-scroll">
        <TableHeader className="w-full sticky top-0 bg-card">
          <TableRow className="w-full border-border">
            {COLUMNS.map((column) => (
              <TableHead className="px-4 py-2 w-1/5" key={column.key}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedLogs.map((log, index) => (
            <TableRow className="border-border" key={index}>
              {COLUMNS.map((column) => (
                <TableCell className="px-4 py-2" key={`${index}-${column.key}`}>
                  {formatCellContent(column.key, log[column.key], log, formattedLogs, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
