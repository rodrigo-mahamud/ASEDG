import { create } from 'zustand'
import { ClientEditStore } from './types'

export const useDashboardStore = create<ClientEditStore>((set) => ({
  isOpen: false,
  dialogType: null,
  clientToEdit: null,
  selectedClients: [],
  isDialogOpen: false,
  usersToDelete: [],
  editedClient: null,

  setIsOpen: (isOpen) => set({ isOpen }),
  setDialogOpen: (isOpen, type) => set({ isDialogOpen: isOpen, dialogType: type }),
  setClientToEdit: (client) => set({ clientToEdit: client, editedClient: client }),
  setSelectedClients: (clientIds) => set({ selectedClients: clientIds }),
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
