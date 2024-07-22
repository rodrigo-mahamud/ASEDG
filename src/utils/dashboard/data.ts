export async function getVisitors() {
  const URL = process.env.SECRET_GYM_DASHBOARD_API_URL_VISITORS
  const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

  try {
    const response = await fetch(`${URL}`, {
      method: 'GET',
      headers: {
        Authorization: `${API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    // await new Promise((resolve) => setTimeout(resolve, 58000))
    const res = await response.json()
    const data = res.data
    return data
  } catch (error) {
    console.error('Error fetching visitors:', error)
  }
}

export async function deleteVisitors(visitorIds: string[]) {
  const URL = process.env.SECRET_GYM_DASHBOARD_API_URL_VISITORS
  const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

  try {
    const deletePromises = visitorIds.map(async (id) => {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${API_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for visitor ID: ${id}`)
      }

      return await response.json()
    })

    const results = await Promise.all(deletePromises)
    const allSuccessful = results.every((result) => result.code === 'SUCCESS')

    if (allSuccessful) {
      console.log(`Successfully deleted ${visitorIds.length} visitors`)
      return { success: true, message: `Successfully deleted ${visitorIds.length} visitors` }
    } else {
      console.error('Some deletions failed:', results)
      return { success: false, message: 'Some deletions failed. Check console for details.' }
    }
  } catch (error) {
    console.error('Error deleting visitors:', error)
    return { success: false, message: 'Error deleting visitors. Check console for details.' }
  }
}
