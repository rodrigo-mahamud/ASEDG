import { create } from 'zustand'
import { ClientEditStore } from './types'
import { deleteVisitors } from '@/utils/dashboard/data'

export const useClientEditStore = create<ClientEditStore>((set, get) => ({
  isOpen: false,
  clientToEdit: null,
  selectedClients: [],
  isDeleteDialogOpen: false,
  usersToDelete: [],
  editedClient: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setClientToEdit: (client) => set({ clientToEdit: client, editedClient: client }),
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
      editedClient: null,
    }),
  setEditedClient: (client) => set({ editedClient: client }),
  updateEditedClient: (field, value) =>
    set((state) => ({
      editedClient: state.editedClient ? { ...state.editedClient, [field]: value } : null,
    })),
  saveEditedClient: () => {
    const { editedClient } = get()
    if (editedClient) {
      // Aquí iría la lógica para guardar el cliente editado en el backend
      console.log('Guardando cliente:', editedClient)
      set({ isOpen: false, clientToEdit: null, editedClient: null })
    }
  },
}))
