'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import { revalidateTag } from 'next/cache'
import configPromise from '@payload-config'
import dayjs from 'dayjs'
const BASE_URL = process.env.SECRET_GYM_DASHBOARD_API_URL_VISITORS
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function getPeriods() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const facilitiesData = (await payload.find({
      collection: 'facilities',
    })) as any

    const data = facilitiesData.docs.find(
      (booking: any) => booking.id === '669147e907d44f5df704e9c1',
    )

    await new Promise((resolve) => setTimeout(resolve, 500000))

    return data
  } catch (error) {
    console.log('aaaa')
  }
}
export async function getVisitors() {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `${API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: { tags: ['refreshVisitors'] },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const res = await response.json()

    // Procesar los datos antes de devolverlos
    const processedData = res.data.map((visitor: any) => {
      const [age, dni, acceptedTerms] = visitor.remarks.split(';')
      return {
        ...visitor,
        age,
        dni,
        acceptedTerms: acceptedTerms === '1',
      }
    })

    return processedData
  } catch (error) {
    console.error('Error fetching visitors:', error)
    throw error
  }
}

export async function addVisitor(visitorData: any) {
  try {
    const remarks = `${visitorData.age};${visitorData.dni};${visitorData.acceptedTerms ? '1' : '0'}`
    const now = dayjs()
    const startTime = now.unix()
    const endTime = visitorData.period > 0 ? now.add(visitorData.period, 'day').unix() : null
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
        remarks: remarks,
        start_time: startTime,
        end_time: endTime,
        visit_reason: 'Gym Membership',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshVisitors')
      return { success: true, message: 'Visitor added successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error adding visitor:', error)
    return { success: false, message: 'Error adding visitor. Check console for details.' }
  }
}

export async function updateVisitor(visitorData: any) {
  try {
    const remarks = `${visitorData.age};${visitorData.dni};${visitorData.acceptedTerms ? '1' : '0'}`
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
        remarks: remarks,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshVisitors')
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
