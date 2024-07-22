import { resolve } from 'path'

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
