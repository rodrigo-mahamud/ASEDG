import useDashboardState from './useDashboardState'

const API_URL = '/api/visitors'

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

export const handleDateTimeChange = (name: string, value: string) => {
  const timestamp = new Date(value).getTime() / 1000
  const { setCurrentVisitor, currentVisitor } = useDashboardState.getState()
  setCurrentVisitor({ ...currentVisitor!, [name]: timestamp })
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
