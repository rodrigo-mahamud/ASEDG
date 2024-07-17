import useDashboardState from './useDashboardState'
import { DateRange } from 'react-day-picker'
import { addWeeks, addMonths, addYears, startOfDay, endOfDay } from 'date-fns'
import { BadgeProps } from '@/components/lib/badge'

const API_URL = '/api/visitors'

export const fetchVisitors = async (page = 1, pageSize = 25) => {
  try {
    const url = `${API_URL}?page_num=${page}&page_size=${pageSize}`

    const response = await fetch(url)
    const data = await response.json()

    const { setVisitors, setPagination } = useDashboardState.getState()
    setVisitors(data.data)

    setPagination({
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(data.total / pageSize),
      totalItems: data.total,
    })
  } catch (error) {
    console.error('Failed to fetch visitors:', error)
  }
}

export const createVisitor = async (visitorData: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    })
    const data = await response.json()
    useDashboardState.getState().addVisitor(data.data)
  } catch (error) {
    console.error('Failed to create visitor:', error)
  }
}

export const updateVisitor = async (id: string, visitorData: any) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    })
    const data = await response.json()
    useDashboardState.getState().updateVisitor(data.data)
  } catch (error) {
    console.error('Failed to update visitor:', error)
  }
}

export const deleteVisitor = async (id: string) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    useDashboardState.getState().deleteVisitor(id)
  } catch (error) {
    console.error('Failed to delete visitor:', error)
  }
}

export const handleDrawerOpen = (visitor?: any) => {
  const { setCurrentVisitor, setDrawerOpenId } = useDashboardState.getState()
  setCurrentVisitor(visitor || null)
  setDrawerOpenId(visitor ? visitor.id : 'new')
}

export const handleDrawerClose = () => {
  const { setDrawerOpenId, setCurrentVisitor } = useDashboardState.getState()
  setDrawerOpenId(null)
  setCurrentVisitor(null)
}

export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  const { setCurrentVisitor, currentVisitor } = useDashboardState.getState()
  setCurrentVisitor({ ...currentVisitor!, [name]: value })
}

export const handleSubmit = async () => {
  const { currentVisitor, setDrawerOpenId, setCurrentVisitor } = useDashboardState.getState()
  if (currentVisitor?.id) {
    await updateVisitor(currentVisitor.id, currentVisitor)
  } else {
    await createVisitor(currentVisitor!)
  }
  setDrawerOpenId(null)
  setCurrentVisitor(null)
}

export const handleDateRangeChange = (range: DateRange | undefined) => {
  const { setCurrentVisitor, currentVisitor } = useDashboardState.getState()
  if (range?.from && range?.to) {
    setCurrentVisitor({
      ...currentVisitor!,
      start_time: Math.floor(range.from.getTime() / 1000),
      end_time: Math.floor(range.to.getTime() / 1000),
    })
  }
}

export const handlePresetChange = (preset: string) => {
  const today = new Date()
  let newRange: DateRange

  switch (preset) {
    case 'day':
      newRange = { from: startOfDay(today), to: endOfDay(today) }
      break
    case 'week':
      newRange = { from: startOfDay(today), to: endOfDay(addWeeks(today, 1)) }
      break
    case 'month':
      newRange = { from: startOfDay(today), to: endOfDay(addMonths(today, 1)) }
      break
    case 'quarter':
      newRange = { from: startOfDay(today), to: endOfDay(addMonths(today, 3)) }
      break
    case 'year':
      newRange = { from: startOfDay(today), to: endOfDay(addYears(today, 1)) }
      break
    default:
      return
  }

  handleDateRangeChange(newRange)
}

export const handleDropdownOpen = (visitorId: string) => {
  const { setDropdownOpenId } = useDashboardState.getState()
  setDropdownOpenId(visitorId)
}

export const handleDropdownClose = () => {
  const { setDropdownOpenId } = useDashboardState.getState()
  setDropdownOpenId(null)
}

export const handleDeleteConfirm = async (visitorId: string) => {
  await deleteVisitor(visitorId)
  handleDropdownClose()
}

export const getStatusDetails = (
  status: string,
): { label: string; variant: BadgeProps['variant'] } => {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
    case '6':
      return { label: 'Activo', variant: 'outlineGreen' }
    case 'VISITED':
    case '2':
      return { label: 'Caducado', variant: 'outlineRed' }
    case 'UPCOMING':
    case '1':
      return { label: 'Próximo', variant: 'outlineBlue' }
    case 'CANCELLED':
    case '4':
      return { label: 'Cancelado', variant: 'outlineRed' }
    case 'NO_VISIT':
    case '5':
      return { label: 'Ausentado', variant: 'outlineBlue' }
    default:
      return { label: 'Activo', variant: 'outlineGreen' }
  }
}
