import useDashboardState from './useDashboardState'

const API_URL = '/api/visitors' // Cambiado para usar nuestra API de Next.js

export const fetchVisitors = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    useDashboardState.getState().setVisitors(data.data)
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

// Los demás manejadores permanecen igual ya que no involucran llamadas a la API

export const handleDrawerOpen = (visitor?: any) => {
  const { setCurrentVisitor, setIsDrawerOpen } = useDashboardState.getState()
  setCurrentVisitor(visitor || null)
  setIsDrawerOpen(true)
}

export const handleDrawerClose = () => {
  const { setIsDrawerOpen, setCurrentVisitor } = useDashboardState.getState()
  setIsDrawerOpen(false)
  setCurrentVisitor(null)
}

export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  const { setCurrentVisitor, currentVisitor } = useDashboardState.getState()
  setCurrentVisitor({ ...currentVisitor!, [name]: value })
}

export const handleSubmit = async () => {
  const { currentVisitor, setIsDrawerOpen, setCurrentVisitor } = useDashboardState.getState()
  if (currentVisitor?.id) {
    await updateVisitor(currentVisitor.id, currentVisitor)
  } else {
    await createVisitor(currentVisitor!)
  }
  setIsDrawerOpen(false)
  setCurrentVisitor(null)
}

export const handleDateTimeChange = (name: string, value: string) => {
  const timestamp = new Date(value).getTime() / 1000
  const { setCurrentVisitor, currentVisitor } = useDashboardState.getState()
  setCurrentVisitor({ ...currentVisitor!, [name]: timestamp })
}

export const handleDropdownOpen = (visitorId: string) => {
  const { setIsDropdownOpen, setVisitorToDelete } = useDashboardState.getState()
  setVisitorToDelete(visitorId)
  setIsDropdownOpen(true)
}

export const handleDropdownClose = () => {
  const { setIsDropdownOpen, setVisitorToDelete } = useDashboardState.getState()
  setIsDropdownOpen(false)
  setVisitorToDelete(null)
}

export const handleDeleteConfirm = async () => {
  const { visitorToDelete, setIsDropdownOpen, setVisitorToDelete } = useDashboardState.getState()
  if (visitorToDelete) {
    await deleteVisitor(visitorToDelete)
    setIsDropdownOpen(false)
    setVisitorToDelete(null)
  }
}
