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

export async function addVisitor(visitorData: any) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: visitorData.first_name,
        last_name: visitorData.last_name,
        email: visitorData.email,
        remarks: `DNI: ${visitorData.dni}, EDAD: ${visitorData.age}`,
        start_time: visitorData.start_time,
        end_time: visitorData.end_time,
        visit_reason: 'Gym Membership',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      return { success: true, message: 'Visitor added successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error adding visitor:', error)
    return { success: false, message: 'Error adding visitor. Check console for details.' }
  }
}

export async function updateVisitor(visitorData: VisitorFormValues) {
  try {
    const response = await fetch(`${BASE_URL}/${visitorData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: visitorData.first_name,
        last_name: visitorData.last_name,
        email: visitorData.email,
        remarks: `DNI: ${visitorData.dni}, EDAD: ${visitorData.age}`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      return { success: true, message: 'Visitor updated successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error updating visitor:', error)
    return { success: false, message: 'Error updating visitor. Check console for details.' }
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
