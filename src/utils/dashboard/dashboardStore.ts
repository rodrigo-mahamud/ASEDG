import { create } from 'zustand'
import { deleteVisitors } from '@/utils/dashboard/data' // Asegúrate de importar la función desde donde la hayas definido

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
  setIsOpen: (isOpen: boolean) => void
  setClientToEdit: (client: Visitor | null) => void
  setSelectedClients: (clientIds: string[]) => void
  deleteSelectedClients: () => Promise<void>
  resetStore: () => void
}

export const useClientEditStore = create<ClientEditStore>((set, get) => ({
  isOpen: false,
  clientToEdit: null,
  selectedClients: [],
  setIsOpen: (isOpen) => set({ isOpen }),
  setClientToEdit: (client) => set({ clientToEdit: client }),
  setSelectedClients: (clientIds) => set({ selectedClients: clientIds }),
  deleteSelectedClients: async () => {
    const { selectedClients } = get()
    const result = await deleteVisitors(selectedClients)
    if (result.success) {
      set({ selectedClients: [] })
      // Aquí podrías también actualizar la lista de visitantes si la mantienes en el store
      console.log(result.message)
    } else {
      console.error(result.message)
      // Aquí podrías manejar el caso de error, por ejemplo, mostrando una notificación al usuario
    }
  },
  resetStore: () => set({ isOpen: false, clientToEdit: null, selectedClients: [] }),
}))
