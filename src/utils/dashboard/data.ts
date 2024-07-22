'use server'

const BASE_URL = process.env.SECRET_GYM_DASHBOARD_API_URL_VISITORS
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function getVisitors() {
  try {
    const response = await fetch(`${BASE_URL}`, {
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
    const res = await response.json()
    return res.data
  } catch (error) {
    console.error('Error fetching visitors:', error)
    throw error
  }
}

export async function deleteVisitors(visitorIds: string[]) {
  try {
    const results = await Promise.all(
      visitorIds.map(async (id) => {
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, {
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
      }),
    )

    const allSuccessful = results.every((result) => result.code === 'SUCCESS')

    if (allSuccessful) {
      return { success: true, message: `Successfully deleted ${visitorIds.length} visitors` }
    } else {
      console.error('Some deletions failed:', results)
      return { success: false, message: 'Some deletions failed. Check console for details.' }
    }
  } catch (error) {
    console.error('Error in deleteVisitors function:', error)
    return { success: false, message: 'Error deleting visitors. Check console for details.' }
  }
}
