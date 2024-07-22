import { create } from 'zustand'
import { deleteVisitors } from '@/utils/dashboard/data' // Asegúrate de que esta función esté correctamente implementada

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
  selectedClients: string[]
  isDeleteDialogOpen: boolean
  usersToDelete: { id: string; name: string }[]
  setIsOpen: (isOpen: boolean) => void
  setClientToEdit: (client: Visitor | null) => void
  setSelectedClients: (clientIds: string[]) => void
  setIsDeleteDialogOpen: (isOpen: boolean) => void
  setUsersToDelete: (users: { id: string; name: string }[]) => void
  deleteSelectedClients: () => Promise<void>
  resetStore: () => void
}

export const useClientEditStore = create<ClientEditStore>((set, get) => ({
  isOpen: false,
  clientToEdit: null,
  selectedClients: [],
  isDeleteDialogOpen: false,
  usersToDelete: [],
  setIsOpen: (isOpen) => set({ isOpen }),
  setClientToEdit: (client) => set({ clientToEdit: client }),
  setSelectedClients: (clientIds) => set({ selectedClients: clientIds }),
  setIsDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
  setUsersToDelete: (users) => set({ usersToDelete: users }),
  deleteSelectedClients: async () => {
    const { selectedClients } = get()
    const result = await deleteVisitors(selectedClients)
    if (result.success) {
      set({ selectedClients: [], usersToDelete: [] })
      console.log(result.message)
    } else {
      console.error(result.message)
    }
  },
  resetStore: () =>
    set({
      isOpen: false,
      clientToEdit: null,
      selectedClients: [],
      isDeleteDialogOpen: false,
      usersToDelete: [],
    }),
}))
