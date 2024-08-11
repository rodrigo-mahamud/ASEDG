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
  startOfYear,
} from 'date-fns'
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail'
import { VisitorFormValues } from './validationSchema'
import { Visitor } from './types'

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
        const [age = '', dni = '', acceptedTerms = '', price = ''] = (visitor.remarks || '').split(
          ';',
        )
        return {
          ...visitor,
          pin_code: '******',
          age: age.trim() ? parseInt(age.trim(), 10) : undefined,
          dni: dni.trim(),
          price: price,
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
    const remarks = `${visitorData.age};${visitorData.dni};${'1'};${visitorData.price};`
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
    case 'year':
      since = now
      until = startOfYear(now)
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
      for (let i = 0; i < 24; i++) {
        const hourStart = addHours(startOfDay(now), i)
        const hourEnd = addHours(hourStart, 1)
        const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
        logCounts[periodKey] = 0
      }

      res.data.hits.forEach((log: any) => {
        const logDate = new Date(log['@timestamp'])
        const hourStart = startOfHour(logDate)
        const hourEnd = addHours(hourStart, 1)
        const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
        logCounts[periodKey]++
      })
    } else {
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
      raw: res.data.hits, // Añadimos los datos sin procesar aquí
    }
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    throw error
  }
}

export async function getRevenue(period: string, type: string = 'admin_activity') {
  try {
    const eventsData = await getActivityLogs(period, type)
    const visitors = await getVisitors()
    const visitorMap = new Map(visitors.map((visitor: Visitor) => [visitor.id, visitor]))

    let revenueData: { date: string; revenue: number; amount: number }[] = []

    if (period === 'day') {
      const now = new Date()
      for (let i = 0; i < 24; i++) {
        const hourStart = addHours(startOfDay(now), i)
        const hourEnd = addHours(hourStart, 1)
        const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
        revenueData.push({
          date: periodKey,
          revenue: 0,
          amount: 0,
        })
      }
    }

    eventsData.raw
      .filter(
        (event: any) =>
          event._source.event.type === 'access.visitor.create' ||
          event._source.event.type === 'access.pin_code.update',
      )
      .forEach((event: any) => {
        const eventDate = new Date(event['@timestamp'])
        const visitorId = event._source.target[0].id
        const visitor = visitorMap.get(visitorId)

        if (visitor) {
          const paidAmount = parseFloat((visitor as any).price) || 0

          if (period === 'day') {
            const hourStart = startOfHour(eventDate)
            const hourEnd = addHours(hourStart, 1)
            const periodKey = `${format(hourStart, 'HH:mm')}-${format(hourEnd, 'HH:mm')}`
            const existingEntry = revenueData.find((entry) => entry.date === periodKey)
            if (existingEntry) {
              existingEntry.revenue += paidAmount
              existingEntry.amount += 1
            }
          } else {
            const dateKey = format(eventDate, 'yyyy-MM-dd')
            const existingEntry = revenueData.find((entry) => entry.date === dateKey)
            if (existingEntry) {
              existingEntry.revenue += paidAmount
              existingEntry.amount += 1
            } else {
              revenueData.push({
                date: dateKey,
                revenue: paidAmount,
                amount: 1,
              })
            }
          }
        }
      })

    // Ordenamos los datos
    if (period === 'day') {
      revenueData.sort((a, b) => {
        const timeA = parse(a.date.split('-')[0], 'HH:mm', new Date())
        const timeB = parse(b.date.split('-')[0], 'HH:mm', new Date())
        return timeA.getTime() - timeB.getTime()
      })
    } else {
      revenueData.sort((a, b) => a.date.localeCompare(b.date))
    }

    const totalRevenue = revenueData.reduce((sum, entry) => sum + entry.revenue, 0)
    const totalAmount = revenueData.reduce((sum, entry) => sum + entry.amount, 0)

    return {
      data: revenueData,
      totalRevenue: totalRevenue,
      totalAmount: totalAmount,
    }
  } catch (error) {
    console.error('Error calculating revenue:', error)
    throw error
  }
}

//CREATE SCHEDULE
export async function createSchedule(facilityData: any, holidayGroupId: string) {
  try {
    const formatTime = (dateString: string) => {
      const date = new Date(dateString)
      return date.toTimeString().split(' ')[0]
    }

    const weekSchedule: { [key: string]: any[] } = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    }

    facilityData.regularSchedule.schedule.forEach((schedule: any) => {
      schedule.days.forEach((day: string) => {
        weekSchedule[day].push({
          start_time: formatTime(schedule.open),
          end_time: formatTime(schedule.close),
        })
      })
    })

    const requestBody = {
      name: `Creado desde la API NO BORRAR (${Date.now()})`,
      week_schedule: weekSchedule,
      holiday_group_id: holidayGroupId,
    }

    // console.log('Request body for createSchedule:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${BASE_URL}/access_policies/schedules`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshFacilities')
      return { success: true, message: 'Schedule created successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error creating schedule:', error)
    return { success: false, message: 'Error creating schedule. Check console for details.' }
  }
}

//CREATE HOLIDAYS
export async function createHolidayGroup(facilityData: any) {
  try {
    const holidays = facilityData.holidayschedule.schedule.map((holiday: any) => ({
      name: holiday.holydayName,
      start_time: new Date(holiday.holydaySince).toISOString(),
      end_time: new Date(holiday.holydayUntill).toISOString(),
      repeat: holiday.holydayRepeat,
    }))

    const requestBody = {
      name: `HolidayGroup-${Date.now()}`,
      holidays: holidays,
    }

    // console.log('Request body for createHolidayGroup:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${BASE_URL}/access_policies/holiday_groups`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      return { success: true, message: 'Holiday Group created successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error creating Holiday Group:', error)
    return { success: false, message: 'Error creating Holiday Group. Check console for details.' }
  }
}

//EDIT Schedule
export async function editSchedule(facilityData: any, scheduleId: string, holidayGroupId: string) {
  try {
    const formatTime = (dateString: string) => {
      const date = new Date(dateString)
      return date.toTimeString().split(' ')[0]
    }

    const weekSchedule: { [key: string]: any[] } = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    }

    facilityData.regularSchedule.schedule.forEach((schedule: any) => {
      schedule.days.forEach((day: string) => {
        weekSchedule[day].push({
          start_time: formatTime(schedule.open),
          end_time: formatTime(schedule.close),
        })
      })
    })

    const requestBody = {
      name: `Creado desde la API NO BORRAR (${Date.now()})`,
      week_schedule: weekSchedule,
      holiday_group_id: holidayGroupId,
    }

    console.log('Request body for editSchedule:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${BASE_URL}/access_policies/schedules/${scheduleId}`, {
      method: 'PUT',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshFacilities')
      return { success: true, message: 'Schedule updated successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error updating schedule:', error)
    return { success: false, message: 'Error updating schedule. Check console for details.' }
  }
}

//EDIT HolidayGroup
export async function editHolidayGroup(facilityData: any, holidayGroupId: string) {
  try {
    const holidays = facilityData.holidayschedule.schedule.map((holiday: any) => ({
      name: holiday.holydayName,
      start_time: new Date(holiday.holydaySince).toISOString(),
      end_time: new Date(holiday.holydayUntill).toISOString(),
      repeat: holiday.holydayRepeat,
    }))

    const requestBody = {
      name: `HolidayGroup-${Date.now()}`,
      holidays: holidays,
    }

    console.log('Request body for editHolidayGroup:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${BASE_URL}/access_policies/holiday_groups/${holidayGroupId}`, {
      method: 'PUT',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      return { success: true, message: 'Holiday Group updated successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error updating Holiday Group:', error)
    return { success: false, message: 'Error updating Holiday Group. Check console for details.' }
  }
}

export async function deleteSchedule(scheduleId: string) {
  try {
    console.log(`Deleting schedule with ID: ${scheduleId}`)

    const response = await fetch(`${BASE_URL}/access_policies/schedules/${scheduleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${API_TOKEN}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()

    if (result.code === 'SUCCESS') {
      revalidateTag('refreshFacilities')
      return { success: true, message: 'Schedule deleted successfully' }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error deleting schedule:', error)
    return { success: false, message: 'Error deleting schedule. Check console for details.' }
  }
}
