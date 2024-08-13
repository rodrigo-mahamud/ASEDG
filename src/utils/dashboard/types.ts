import { VisitorFormValues } from './validationSchema'

export type Visitor = {
  id: string
  first_name: string
  last_name: string
  email: string
  start_time: number
  end_time: number
  status: string
  avatar: string
  inviter_id: string
  inviter_name: string
  mobile_phone: string
  location_id: string
  nfc_cards: any[]
  pin_code: string
  remarks: string
  resources: Array<{ id: string; name: string; type: string }>
  schedule: {
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
  visit_reason: string
  visitor_company: string
  dni?: string
  age?: number
  price?: string
  periodId?: string
}

export type UserToDelete = {
  id: string
  name: string
}

export type ClientEditStore = {
  isOpen: boolean
  clientToEdit: Visitor | null
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
