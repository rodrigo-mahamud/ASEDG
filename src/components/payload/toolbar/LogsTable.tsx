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
import { format, parseISO } from 'date-fns'
import { LogsTypes } from '@/utils/dashboard/types'

export async function LogsTable() {
  const logs: LogsTypes = await getActivityLogs('week', 'all')

  if (!logs || logs.raw.length === 0) {
    return <p>No logs available.</p>
  }

  const columns = [
    { key: 'timestamp', label: 'Date and Time' },
    { key: 'userName', label: 'User Name' },
    { key: 'action', label: 'Action' },
    { key: 'userType', label: 'User Type' },
    { key: 'resourceId', label: 'Resource ID' },
  ]

  const formatLogData = (log) => ({
    timestamp: format(parseISO(log['@timestamp']), 'yyyy-MM-dd HH:mm:ss'),
    userName: log._source.actor.display_name,
    action: log._source.event.type,
    userType: log._source.actor.type,
    resourceId: log._source.target.find((t) => t.type === 'activities_resource')?.id || 'N/A',
  })

  const formattedLogs = logs.raw.map(formatLogData)

  return (
    <Table className="block max-h-[45rem] overflow-y-scroll">
      <TableHeader className="w-full sticky top-0 bg-card">
        <TableRow className="w-full">
          {columns.map((column) => (
            <TableHead className="px-4 py-2" key={column.key}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {formattedLogs.map((log, index: number) => (
          <TableRow className="border-border" key={index}>
            {columns.map((column) => (
              <TableCell className="px-4 py-2" key={`${index}-${column.key}`}>
                {log[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
