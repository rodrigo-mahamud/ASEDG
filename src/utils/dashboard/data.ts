'use server'
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
  const BASE_URL = process.env.SECRET_GYM_DASHBOARD_API_URL_VISITORS
  const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

  console.log('BASE_URL:', BASE_URL)
  console.log('API_TOKEN:', API_TOKEN ? 'Defined' : 'Undefined')
  console.log('Visitor IDs to delete:', visitorIds)

  try {
    const results = await Promise.all(
      visitorIds.map(async (id) => {
        const url = `${BASE_URL}/${id}`
        console.log('Attempting to delete visitor with URL:', url)

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `${API_TOKEN}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        console.log(`Response status for visitor ${id}:`, response.status)

        if (!response.ok) {
          console.error(`Error response for visitor ${id}:`, await response.text())
          throw new Error(`HTTP error! status: ${response.status} for visitor ID: ${id}`)
        }

        const resultJson = await response.json()
        console.log(`Delete result for visitor ${id}:`, resultJson)
        return resultJson
      }),
    )

    console.log('All delete results:', results)

    const allSuccessful = results.every((result) => result.code === 'SUCCESS')

    if (allSuccessful) {
      console.log('All deletions successful')
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
