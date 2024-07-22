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
  pin_code: { token: string }
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
}

export type ClientEditStore = {
  isOpen: boolean
  clientToEdit: Visitor | null
  selectedClients: string[]
  isDeleteDialogOpen: boolean
  usersToDelete: { id: string; name: string }[]
  editedClient: Visitor | null
  setIsOpen: (isOpen: boolean) => void
  setClientToEdit: (client: Visitor | null) => void
  setSelectedClients: (clientIds: string[]) => void
  setIsDeleteDialogOpen: (isOpen: boolean) => void
  setUsersToDelete: (users: { id: string; name: string }[]) => void
  deleteSelectedClients: () => Promise<void>
  resetStore: () => void
  setEditedClient: (client: Visitor | null) => void
  updateEditedClient: (field: keyof Visitor, value: string) => void
  saveEditedClient: () => void
}
