import { create } from 'zustand'
import { ClientEditStore } from './types'

export const useDashboardStore = create<ClientEditStore>((set) => ({
  isOpen: false,
  clientToEdit: null,
  selectedClients: [],
  isDialogOpen: false,
  usersToDelete: [],
  editedClient: null,

  setIsOpen: (isOpen) => set({ isOpen }),
  setClientToEdit: (client) => set({ clientToEdit: client, editedClient: client }),
  setSelectedClients: (clientIds) => set({ selectedClients: clientIds }),
  setDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
  setUsersToDelete: (users) => set({ usersToDelete: Array.isArray(users) ? users : [users] }),
  resetStore: () =>
    set({
      isOpen: false,
      clientToEdit: null,
      selectedClients: [],
      isDialogOpen: false,
      usersToDelete: [],
      editedClient: null,
    }),
  setEditedClient: (client) => set({ editedClient: client }),
  updateEditedClient: (field, value) =>
    set((state) => ({
      editedClient: state.editedClient ? { ...state.editedClient, [field]: value } : null,
    })),
}))
