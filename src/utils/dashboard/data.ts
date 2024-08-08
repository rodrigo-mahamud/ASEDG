'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import { revalidateTag } from 'next/cache'
import configPromise from '@payload-config'
import { render } from '@react-email/components'
import {
  format,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
  getUnixTime,
  parse,
  startOfHour,
  addHours,
  endOfDay,
  startOfDay,
} from 'date-fns'
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
      subject: 'Registro exitoso en el gimnasio.',
      html: emailHtml,
    })
    console.log('Correo electrónico enviado con éxito')
  } catch (emailError) {
    console.error('Error al enviar el correo electrónico:', emailError)
    throw new Error('Failed to send email')
  }
}

//LOGS
export async function getActivityLogs(period: string, type: string = 'door_openings') {
  const now = new Date()
  let since: Date
  let until: Date

  switch (period) {
    case 'day':
      since = endOfDay(now)
      until = startOfDay(now)
      break
    case 'week':
      since = now
      until = subDays(now, 7)
      break
    case 'currentmonth':
      since = now
      until = startOfMonth(now)
      break
    case 'pastmonth':
      since = endOfMonth(subMonths(now, 1))
      until = startOfMonth(subMonths(now, 1))
      break
    case 'quarter':
      since = now
      until = subMonths(now, 3)
      break
    default:
      throw new Error('Invalid period')
  }

  const sinceUnix = getUnixTime(since)
  const untilUnix = getUnixTime(until)

  try {
    const response = await fetch(`${BASE_URL}/system/logs`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: type,
        since: untilUnix,
        until: sinceUnix,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()

    let logCounts: Record<string, number> = {}

    if (period === 'day') {
      // Inicializamos todos los períodos de hora del día
      for (let i = 0; i < 24; i++) {
        const hourStart = addHours(startOfDay(now), i)
        const hourEnd = addHours(hourStart, 1)
        const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
        logCounts[periodKey] = 0
      }

      // Agrupamos por períodos de una hora
      res.data.hits.forEach((log: any) => {
        const logDate = new Date(log['@timestamp'])
        const hourStart = startOfHour(logDate)
        const hourEnd = addHours(hourStart, 1)
        const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
        logCounts[periodKey]++
      })
    } else {
      // Para otros períodos, mantenemos la lógica anterior
      res.data.hits.forEach((log: any) => {
        const dateKey = format(new Date(log['@timestamp']), 'yyyy-MM-dd')
        logCounts[dateKey] = (logCounts[dateKey] || 0) + 1
      })
    }

    const processedData = Object.entries(logCounts).map(([date, amount]) => ({
      date,
      amount: amount as number,
    }))

    // Ordenamos los datos
    if (period === 'day') {
      processedData.sort((a, b) => {
        const timeA = parse(a.date.split('-')[0], 'HH:mm', new Date())
        const timeB = parse(b.date.split('-')[0], 'HH:mm', new Date())
        return timeA.getTime() - timeB.getTime()
      })
    } else {
      processedData.sort((a, b) => a.date.localeCompare(b.date))
    }

    // Calcular el total de amount
    const totalAmount = processedData.reduce((sum, entry) => sum + entry.amount, 0)

    return {
      data: processedData,
      totalAmount: totalAmount,
    }
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    throw error
  }
}
