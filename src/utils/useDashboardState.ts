import { create } from 'zustand'

export interface Visitor {
  id?: string
  first_name: string
  last_name: string
  status: string
  email: string
  start_time: number
  end_time: number
}

interface Pagination {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
}

interface DashboardState {
  visitors: Visitor[]
  pagination: Pagination
  drawerOpenId: string | null
  dropdownOpenId: string | null
  currentVisitor: Visitor | null
  setVisitors: (visitors: Visitor[]) => void
  setPagination: (pagination: Pagination) => void
  addVisitor: (visitor: Visitor) => void
  updateVisitor: (updatedVisitor: Visitor) => void
  deleteVisitor: (id: string) => void
  setDrawerOpenId: (id: string | null) => void
  setDropdownOpenId: (id: string | null) => void
  setCurrentVisitor: (visitor: Visitor | null) => void
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
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0,
  },
  drawerOpenId: null,
  dropdownOpenId: null,
  currentVisitor: null,
  setVisitors: (visitors) => set({ visitors }),
  setPagination: (pagination) => set({ pagination }),
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
  setDrawerOpenId: (id) => set({ drawerOpenId: id }),
  setDropdownOpenId: (id) => set({ dropdownOpenId: id }),
  setCurrentVisitor: (visitor) => set({ currentVisitor: visitor || defaultVisitor }),
}))

export default useDashboardState
