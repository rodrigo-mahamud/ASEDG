import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { LogsTypes, FormattedLog } from '@/utils/dashboard/types'

export interface ActionInfo {
  text: string
  icon: string
  variant: string
}

export const ACTION_MAPPING: Record<string, ActionInfo> = {
  'access.door.unlock': { text: 'Puerta abierta', icon: 'IconLogin', variant: 'outlineYellow' },
  'access.pin_code.update': {
    text: 'Pin actualizado',
    icon: 'IconLockPassword',
    variant: 'outlineBlue',
  },
  'access.settings.change': {
    text: 'Ajustes modificados',
    icon: 'IconSettings',
    variant: 'outlineBlue',
  },
  'access.data.device.remote_unlock': {
    text: 'Apertura remota',
    icon: 'IconDoorOff',
    variant: 'outlineBlue',
  },
  'access.device.upgrade': {
    text: 'Actualizción Exitosa',
    icon: 'IconRefresh',
    variant: 'outlineGreen',
  },
  'access.dps.status.update': {
    text: 'Actualizción Exitosa',
    icon: 'IconRefresh',
    variant: 'outlineGreen',
  },
  'access.device.offline': {
    text: 'Desconectado',
    icon: 'IconX',
    variant: 'outlineRed',
  },
  'access.device.online': {
    text: 'Conectado',
    icon: 'IconChecks',
    variant: 'outlineGreen',
  },
  'access.visitor.create': {
    text: 'Usuario creado',
    icon: 'IconUserPlus',
    variant: 'outlineGreen',
  },
  'access.remotecall.request': {
    text: 'Llamada a la puerta',
    icon: 'IconBellRinging',
    variant: 'outlineBlue',
  },
}

export const getActionDisplay = (actionType: string): ActionInfo =>
  ACTION_MAPPING[actionType] || { text: actionType, icon: 'IconQuestionMark' }

export const formatLogData = (log: any): FormattedLog => {
  const timestamp = parseISO(log['@timestamp'])
  const activityResource = log._source.target.find((t: any) => t.type === 'activities_resource')

  return {
    timestamp: format(timestamp, 'dd/MM/yy HH:mm', { locale: es }),
    daystamp: format(timestamp, 'dd/MM/yyyy - iiii', { locale: es }),
    hourstamp: format(timestamp, 'HH:mm:ss', { locale: es }),
    userName:
      log._source.actor.display_name === 'N/A' ? 'Desconocido' : log._source.actor.display_name,
    action: getActionDisplay(log._source.event.type),
    userType: log._source.actor.type,
    videoID: activityResource ? activityResource.id : 'N/A',
    userID: log._source.actor?.id || '',
    unlockMethod: log._source.authentication?.credential_provider || '',
    rawLog: log,
  }
}
