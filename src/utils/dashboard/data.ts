'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import { revalidateTag } from 'next/cache'
import configPromise from '@payload-config'
import { render } from '@react-email/components'
import { format } from 'date-fns'
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail'

import { VisitorFormValues } from './validationSchema'

const BASE_URL = process.env.SECRET_GYM_DASHBOARD_API_URL
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN
const GYM_CREDENTIALS_URL = process.env.SECRET_GYM_DASHBOARD_API_URL_CREDENTIALS
export async function getPeriods() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const facilitiesData = (await payload.find({
      collection: 'facilities',
    })) as any

    const data = facilitiesData.docs.find(
      (booking: any) => booking.id === '669147e907d44f5df704e9c1',
    )

    return data
  } catch (error) {
    console.error('Error fetching periods:', error)
  }
}
export async function getVisitors() {
  try {
    const response = await fetch(`${BASE_URL}/visitors`, {
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
    // await new Promise((resolve) => setTimeout(resolve, 50000))
    const res = await response.json()

    const processedData = res.data
      .filter((visitor: any) => visitor.status !== 'CANCELLED')
      .map((visitor: any) => {
        const [age = '', dni = '', acceptedTerms = ''] = (visitor.remarks || '').split(';')
        return {
          ...visitor,
          pin_code: '******',
          age: age.trim() ? parseInt(age.trim(), 10) : undefined,
          dni: dni.trim(),
          terms: acceptedTerms.trim() === '1',
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
    const remarks = `${visitorData.age};${visitorData.dni};${'1'}`
    const response = await fetch(`${BASE_URL}/visitors`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: visitorData.first_name,
        last_name: visitorData.last_name,
        email: visitorData.email,
        mobile_phone: visitorData.mobile_phone,
        remarks: remarks,
        start_time: visitorData.start_time,
        end_time: visitorData.end_time,
        pin_code: visitorData.pin_code,
        resources: [{ id: process.env.SECRET_GYM_DOOR_ID, type: 'door' }],
        visit_reason: 'Others',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshVisitors')
      await sendEmail(visitorData)
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
    const remarks = `${visitorData.age};${visitorData.dni};${'1'}`
    const response = await fetch(`${BASE_URL}/visitors/${visitorData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: visitorData.first_name,
        last_name: visitorData.last_name,
        email: visitorData.email,
        mobile_phone: visitorData.mobile_phone,
        remarks: remarks,
        start_time: visitorData.start_time,
        end_time: visitorData.end_time,
        pin_code: visitorData.pin_code,
        visit_reason: 'Others',
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
        const url = `${BASE_URL}/visitors/${id}`
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
      revalidateTag('refreshVisitors')

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

export async function generatePinCode() {
  try {
    const response = await fetch(`${GYM_CREDENTIALS_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      return { success: true, pinCode: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error generating PIN code:', error)
    return { success: false, message: 'Error generating PIN code. Check console for details.' }
  }
}
export async function sendEmail(visitorData: VisitorFormValues) {
  try {
    const emailHtml = render(
      BookingConfirmationEmail({
        nombre: visitorData.first_name,
        apellidos: visitorData.last_name,
        email: visitorData.email,
        telefono: visitorData.mobile_phone,
        fechaInicio: new Date(visitorData.start_time! * 1000).toLocaleString(),
        fechaFin: new Date(visitorData.end_time! * 1000).toLocaleString(),
        pinCode: visitorData.pin_code,
      }),
    )

    const payload = await getPayloadHMR({ config: configPromise })

    await payload.sendEmail({
      to: visitorData.email,
      subject: 'Registro exitoso en el gimnasio',
      html: emailHtml,
    })
    console.log('Correo electrónico enviado con éxito')
  } catch (emailError) {
    console.error('Error al enviar el correo electrónico:', emailError)
    throw new Error('Failed to send email')
  }
}

//LOGS

export async function getActivityLogs(since: number, until: number) {
  try {
    const response = await fetch(`${BASE_URL}/system/logs`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'door_openings',
        since: since,
        until: until,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()

    // Procesar los datos para obtener el conteo por día
    const logCounts = res.data.hits.reduce((acc: Record<string, number>, log: any) => {
      const date = format(new Date(log['@timestamp']), 'yyyy-MM-dd')
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    // Convertir el objeto de conteo a un array de objetos con la estructura deseada
    const processedData = Object.entries(logCounts).map(([date, amount]) => ({
      date,
      amount,
    }))

    // Ordenar los datos por fecha
    processedData.sort((a, b) => a.date.localeCompare(b.date))

    return processedData
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    throw error
  }
}
