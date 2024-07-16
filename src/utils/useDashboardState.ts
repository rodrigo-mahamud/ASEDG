import { create } from 'zustand'

interface Visitor {
  id?: string
  first_name: string
  last_name: string
  status: string
  email: string
  start_time: number
  end_time: number
}

interface DashboardState {
  visitors: Visitor[]
  isDrawerOpen: boolean
  isDropdownOpen: boolean
  currentVisitor: Visitor | null
  visitorToDelete: string | null
  setVisitors: (visitors: Visitor[]) => void
  addVisitor: (visitor: Visitor) => void
  updateVisitor: (updatedVisitor: Visitor) => void
  deleteVisitor: (id: string) => void
  setIsDrawerOpen: (isOpen: boolean) => void
  setIsDropdownOpen: (isOpen: boolean) => void
  setCurrentVisitor: (visitor: Visitor | null) => void
  setVisitorToDelete: (id: string | null) => void
}

const defaultVisitor: Visitor = {
  first_name: '',
  last_name: '',
  email: '',
  status: 'ACTIVE',
  start_time: Date.now() / 1000,
  end_time: Date.now() / 1000 + 86400, // Default to 24 hours from now
}

const useDashboardState = create<DashboardState>((set) => ({
  visitors: [],
  isDrawerOpen: false,
  isDropdownOpen: false,
  currentVisitor: null,
  visitorToDelete: null,
  setVisitors: (visitors) => set({ visitors }),
  addVisitor: (visitor) => set((state) => ({ visitors: [...state.visitors, visitor] })),
  updateVisitor: (updatedVisitor) =>
    set((state) => ({
      visitors: state.visitors.map((visitor) =>
        visitor.id === updatedVisitor.id ? updatedVisitor : visitor,
      ),
    })),
  deleteVisitor: (id) =>
    set((state) => ({
      visitors: state.visitors.filter((visitor) => visitor.id !== id),
    })),
  setIsDrawerOpen: (isOpen) => set({ isDrawerOpen }),
  setIsDropdownOpen: (isOpen) => set({ isDropdownOpen }),
  setCurrentVisitor: (visitor) => set({ currentVisitor: visitor || defaultVisitor }),
  setVisitorToDelete: (id) => set({ visitorToDelete: id }),
}))

export default useDashboardState
