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
import { es } from 'date-fns/locale'
import { LogsTypes, Column, FormattedLog } from '@/utils/dashboard/types'
import { LogsDetails } from './LogsDetails'
import { IconDisplay } from '@/components/IconDisplay' // Make sure to import the new component

const COLUMNS: Column[] = [
  { key: 'timestamp', label: 'Fecha' },
  { key: 'userName', label: 'Usuario' },
  { key: 'userType', label: 'Tipo de usuario' },
  { key: 'action', label: 'Acción' },
  { key: 'details', label: 'Detalles' },
]

const ACTION_MAPPING: Record<string, ActionInfo> = {
  'access.door.unlock': { text: 'Puerta abierta', icon: 'IconLogin' },
  'access.pin_code.update': { text: 'Pin actualizado', icon: 'IconKey' },
  'access.settings.change': { text: 'Cambio en la configuración', icon: 'IconSettings' },
  'access.data.device.remote_unlock': { text: 'Apertura remota', icon: 'IconDoorOff' },
  'access.device.upgrade': { text: 'Dispositivo actualizado', icon: 'IconRefresh' },
  'access.dps.status.update': { text: 'Dispositivo actualizado', icon: 'IconDeviceMobile' },
  'access.device.offline': { text: 'Dispositivo desconectado', icon: 'IconWifiOff' },
  'access.device.online': { text: 'Dispositivo conectado', icon: 'IconWifi' },
  'access.visitor.create': { text: 'Usuario creado', icon: 'IconUserPlus' },
  'access.remotecall.request': { text: 'Llamada a la puerta', icon: 'IconPhone' },
}

const getActionDisplay = (actionType: string): ActionInfo =>
  ACTION_MAPPING[actionType] || { text: actionType, icon: 'IconQuestionMark' }

const formatLogData = (log: any): FormattedLog => {
  const timestamp = parseISO(log['@timestamp'])
  const activityResource = log._source.target.find((t: any) => t.type === 'activities_resource')

  return {
    timestamp: format(timestamp, 'dd/MM/yy HH:mm', { locale: es }),
    daystamp: format(timestamp, 'dd/MM/yyyy - iiii', { locale: es }),
    hourstamp: format(timestamp, 'HH:mm:ss', { locale: es }),
    userName: log._source.actor.display_name,
    action: getActionDisplay(log._source.event.type),
    userType: log._source.actor.type,
    videoID: activityResource ? activityResource.id : 'N/A',
    userID: log._source.actor?.id || '',
    unlockMethod: log._source.authentication?.credential_provider || '',
    rawLog: log,
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
                <TableCell className="px-4 py-2 " key={`${index}-${column.key}`}>
                  {column.key === 'details' ? (
                    <LogsDetails log={log} logs={formattedLogs} currentIndex={index} />
                  ) : column.key === 'action' ? (
                    <div className="flex items-center gap-1">
                      <IconDisplay iconName={log.action.icon} size={14} />
                      <span>{log.action.text}</span>
                    </div>
                  ) : (
                    log[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
