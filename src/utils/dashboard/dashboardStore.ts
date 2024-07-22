import { create } from 'zustand'

export type Visitor = {
  id: string
  first_name: string
  last_name: string
  email: string
  start_time: number
  end_time: number
  status: string
}

interface ClientEditStore {
  isOpen: boolean
  clientToEdit: Visitor | null
  setIsOpen: (isOpen: boolean) => void
  setClientToEdit: (client: Visitor | null) => void
  resetStore: () => void
}

export const useClientEditStore = create<ClientEditStore>((set) => ({
  isOpen: false,
  clientToEdit: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setClientToEdit: (client) => set({ clientToEdit: client }),
  resetStore: () => set({ isOpen: false, clientToEdit: null }),
}))
