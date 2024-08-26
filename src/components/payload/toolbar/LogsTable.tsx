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
import { Column, FormattedLog } from '@/utils/dashboard/types'
import { LogsVideo } from './LogsVideo'

export async function LogsTable() {
  const logs: LogsTypes = await getActivityLogs('week', 'all')

  if (!logs || logs.raw.length === 0) {
    return <p>No logs available.</p>
  }

  const columns: Column[] = [
    { key: 'timestamp', label: 'Fecha' },
    { key: 'userName', label: 'Usuario' },
    { key: 'action', label: 'Acción' },
    { key: 'userType', label: 'User Type' },
    { key: 'resourceId', label: 'Resource ID' },
  ]
  const actionMapping: { [key: string]: string } = {
    'access.door.unlock': 'Apertura de puerta',
    'access.pin_code.update': 'Pin actualizado ',
    'access.settings.change': 'Cambio en la configuración',
    'access.data.device.remote_unlock': 'Apertura remota',
    'access.device.upgrade': 'Dispositivo actualizado',
    'access.dps.status.update': 'Dispositivo actualizado',
    'access.device.offline': 'Dispositivo desconectado',
    'access.device.online': 'Dispositivo conectado',
    'access.visitor.create': 'Usuario creado',
    'access.remotecall.request': 'Llamada a la puerta',
  }

  const getActionDisplay = (actionType: string): string => {
    return actionMapping[actionType] || actionType // Si no hay mapeo, devuelve el tipo original
  }

  const formatLogData = (log) => {
    const activityResource = log._source.target.find((t) => t.type === 'activities_resource')
    return {
      timestamp: format(parseISO(log['@timestamp']), 'HH:mm:ss dd/MM/yy'),
      userName: log._source.actor.display_name,
      action: getActionDisplay(log._source.event.type),
      userType: log._source.actor.type,
      resourceId: activityResource ? activityResource.id : 'N/A',
      resourceType: activityResource ? activityResource.type : 'N/A',
    }
  }

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
        {formattedLogs.map((log, index) => (
          <TableRow className="border-border" key={index}>
            {columns.map((column) => (
              <TableCell className="px-4 py-2" key={`${index}-${column.key}`}>
                {column.key === 'resourceId' ? (
                  <>
                    {log[column.key]}
                    <LogsVideo resourceId={log.resourceId} resourceType={log.resourceType} />
                  </>
                ) : (
                  log[column.key]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
