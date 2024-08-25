export interface VisitorData {
  id?: string
  first_name?: string
  last_name?: string
  email?: string
  start_time?: number
  end_time?: number
  status?: string
  avatar?: string
  inviter_id?: string
  inviter_name?: string
  mobile_phone: string
  location_id?: string
  nfc_cards?: any[]
  pin_code?: string
  remarks?: string
  resources?: Array<{ id: string; name: string; type: string }>
  schedule?: {
    id: string
    is_default: boolean
    name: string
    type: string
    weekly: Record<string, Array<{ start_time: string; end_time: string }>>
    holiday_group: {
      id: string
      name: string
      is_default: boolean
      description: string
      holidays: any[]
    }
  }
  schedule_id: string
  visit_reason?: string
  visitor_company?: string
  dni?: string
  age?: number
  price?: number
  period_id?: string
}
export type Visitor = {
  data: VisitorData[]
  totalActive: number
}

export type UserToDelete = {
  id: string
  name: string
}

export type ClientEditStore = {
  isOpen: boolean
  clientToEdit: VisitorData | null
  selectedClients: string[]
  isDialogOpen: boolean
  usersToDelete: UserToDelete[]
  editedClient: Visitor | null
  dialogType: string | null
  setIsOpen: (isOpen: boolean) => void
  setDialogOpen: (isOpen: boolean, type: string | null) => void
  setClientToEdit: (client: Visitor | null) => void
  setSelectedClients: (clientIds: string[]) => void
  setUsersToDelete: (users: UserToDelete[] | UserToDelete) => void
  resetStore: () => void
  setEditedClient: (client: Visitor | null) => void
  updateEditedClient: (field: keyof Visitor, value: any) => void
}

export type BookingOption = {
  periodType: 'days' | 'months'
  name: string
  periodLength: number
  price: number
  daysAmount: number
  id: string
}

export type BookingOptionsTypes = BookingOption[] | undefined

// New types for AddEditDatePicker
export interface DatePeriodPickerProps {
  field: {
    value: { start_time?: number; end_time?: number; price?: number; period_id: string }
    onChange: (value: {
      start_time?: number
      end_time?: number
      price?: number
      period_id: string
    }) => void
  }
  periods: BookingOptionsTypes
  error: string | null
  isLoading: boolean
}

export interface PeriodsData {
  bookingOptions: BookingOptionsTypes | undefined
}
export interface PieAgeProps {
  data: Array<{ ages: string; amount: number }>
  average: number
}
export type DoorOperation = 'open' | 'close'

//WS MSG
// WebSocket Message Types

export interface wsMsgTypes {
  event: string
  receiver_id: string
  event_object_id: string
  save_to_history: boolean
  data: DeviceData
}

export interface DeviceData {
  unique_id: string
  name: string
  alias: string
  device_type: string
  connected_uah_id: string
  location_id: string
  firmware: string
  version: null | string
  ip: string
  mac: string
  hw_type: string
  start_time: number
  security_check: boolean
  source: null | string
  bom_rev: string
  guid: string
  need_advisory: boolean
  is_adopted: boolean
  is_managed: boolean
  is_connected: boolean
  is_online: boolean
  adopting: boolean
  location: Location
  door: Location
  floor: Location
  configs: Config[]
  update: null | any
  update_manual: UpdateManual
  capabilities: string[]
  resource_name: string
  display_model: string
  revision: string
  revision_update_time: number
  version_update_time: number
  firmware_update_time: number
  adopt_time: number
  model: string
  images: Images
}

export interface Location {
  unique_id: string
  name: string
  up_id: string
  timezone: string
  location_type: string
  extra_type: string
  full_name: string
  level: number
  work_time: string
  work_time_id: string
  extras: {
    door_thumbnail?: string
    door_thumbnail_last_update?: number
    'uah-input_state_dps'?: string
    'uah-wiring_state_dps-neg'?: string
    'uah-wiring_state_dps-pos'?: string
    [key: string]: any
  }
}

export interface Config {
  device_id: string
  key: string
  value: string
  tag: string
  source: string
}

export interface UpdateManual {
  device_version_upgrade_status: {
    completed: boolean
    is_waiting: boolean
    is_upgrading: boolean
    upgrade_seconds: number
    timed_out: boolean
    failed: boolean
    failure_reason: string
    is_downloading: boolean
  }
  from_version: string
  last_upgrade_start_time: null | number
  last_upgrade_success: null | boolean
  last_upgrade_failure_reason: string
}

export interface Images {
  xs: string
  s: string
  m: string
  l: string
  xl: string
  xxl: string
  base: string
}

export interface LogsTypes {
  raw: Array<{
    '@timestamp': string
    _id: string
    _source: {
      actor: {
        alternate_id: string
        alternate_name: string
        display_name: string
        id: string
        type: 'user' | 'visitor' | 'open_api'
      }
      authentication: {
        credential_provider: string
        issuer: string
      } | null
      event: {
        display_message: string
        published: number
        reason: string
        result: string
        type: string
      }
      target: Array<{
        alternate_id: string
        alternate_name: string
        display_name: string
        id: string
        type: string
      }>
    }
    log_key: string
    tag: string
  }>
}
