'use server'
import WebSocket from 'ws'
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
  differenceInDays,
  parseISO,
  fromUnixTime,
  addMinutes,
} from 'date-fns'
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail'
import { DoorOperation, VisitorData } from './types'
import PinCodeChangedEmail from '@/emails/PinCodeChangedEmail'
import ReportMail from '@/emails/BanUserMail'
import BanUserMail from '@/emails/BanUserMail'

import { es } from 'date-fns/locale'
const BASE_URL = process.env.SECRET_GYM_DASHBOARD_API_URL
const WS_URL = process.env.SECRET_GYM_DASHBOARD_WS_URL
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN
const GYM_CREDENTIALS_URL = process.env.SECRET_GYM_DASHBOARD_API_URL_CREDENTIALS
const GYM_DOOR_ID = process.env.SECRET_GYM_DOOR_ID

export async function getSchedule() {
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
export async function getPayload() {
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
    // await new Promise((resolve) => setTimeout(resolve, 500000000))
    const res = await response.json()
    let totalActive = 0
    const processedData = res.data
      .filter((visitor: VisitorData) => visitor.status !== 'CANCELLED')
      .map((visitor: VisitorData) => {
        const [age = '', dni = '', acceptedTerms = '', price = '', period_id = ''] = (
          visitor.remarks || ''
        ).split(';')
        const { pin_code, ...visitorWithoutPin } = visitor

        // Incrementar totalActive si el visitante está activo o visitando
        if (visitor.status === 'VISITING' || visitor.status === 'ACTIVE') {
          totalActive++
        }

        return {
          ...visitorWithoutPin,
          age: age.trim() ? parseInt(age.trim(), 10) : undefined,
          dni: dni.trim(),
          price: price,
          period_id: period_id,
          terms: acceptedTerms.trim() === '1',
        }
      })
    return {
      data: processedData,
      totalActive: totalActive,
    }
  } catch (error) {
    console.error('Error fetching visitors:', error)
    throw error
  }
}
export async function getSpecificUser(id: VisitorData, type: string) {
  try {
    if (type === 'visitor') {
      const response = await fetch(`${BASE_URL}/visitors/${id}`, {
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

      const processedData = res.data

      const [age = '', dni = '', acceptedTerms = '', price = '', period_id = ''] = (
        processedData.remarks || ''
      ).split(';')

      return {
        data: {
          ...processedData,
          age: age.trim() ? parseInt(age.trim(), 10) : undefined,
          dni: dni.trim(),
          price: price.trim(),
          period_id: period_id.trim(),
          terms: acceptedTerms.trim() === '1',
        },
      }
    }
    if (type === 'user') {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
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

      return {
        data: res.data,
      }
    }
  } catch (error) {
    console.error('Error fetching User:', error)
    throw error
  }
}
export async function addVisitor(visitorData: VisitorData) {
  try {
    const remarks = `${visitorData.age};${visitorData.dni};${'1'};${visitorData.price};${
      visitorData.period_id
    }`
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
        schedule_id: visitorData.schedule_id,
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
      await sendEmail(visitorData, 'confirmation')
      return { success: true, message: 'Visitor added successfully', data: result.data }
    } else {
      throw new Error(`API error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error adding visitor:', error)
    return { success: false, message: 'Error adding visitor. Check console for details.' }
  }
}

export async function updateVisitor(visitorData: VisitorData) {
  try {
    const remarks = `${visitorData.age};${visitorData.dni};${'1'};${visitorData.price};${
      visitorData.period_id
    }`
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
        schedule_id: visitorData.schedule_id,
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
export async function sendEmail(
  visitorData: any,
  template: 'confirmation' | 'pinCode' | 'report' | 'ban' | 'openClose',
) {
  try {
    let emailHtml: string
    let subject: string

    switch (template) {
      case 'confirmation':
        emailHtml = render(
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
        subject = 'Registro exitoso en el gimnasio.'
        break
      case 'pinCode':
        emailHtml = render(
          PinCodeChangedEmail({
            nombre: visitorData.first_name,
            apellidos: visitorData.last_name,
            email: visitorData.email,
            pinCode: visitorData.pin_code,
          }),
        )
        subject = 'Tu nuevo código de acceso.'
        break
      case 'report':
        emailHtml = render(
          ReportMail({
            nombre: visitorData.first_name,
            apellidos: visitorData.last_name,
            email: visitorData.email,
            reason: visitorData.report_reason,
          }),
        )
        subject = 'Incidencia con .'
        break
      case 'ban':
        emailHtml = render(
          BanUserMail({
            nombre: visitorData.first_name,
            apellidos: visitorData.last_name,
            email: visitorData.email,
            reason: visitorData.report_reason,
          }),
        )
        subject = 'Incidencia con tu acceso al gimnasio.'
        break
      default:
        throw new Error('Plantilla de correo no reconocida')
    }

    const payload = await getPayloadHMR({ config: configPromise })

    await payload.sendEmail({
      to: visitorData.email,
      subject: subject,
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
    let logCounts: Record<string, any> = {}
    if (period === 'day') {
      for (let i = 0; i < 24; i++) {
        const hourStart = addHours(startOfDay(now), i)
        const periodKey = `${format(hourStart, 'HH:00')}`
        logCounts[periodKey] = null
      }
      res.data.hits.forEach((log: any) => {
        const logDate = new Date(log['@timestamp'])
        const hourStart = startOfHour(logDate)
        const periodKey = `${format(hourStart, 'HH:00')}`
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
        const timeA = parse(a.date, 'HH:00', new Date())
        const timeB = parse(b.date, 'HH:00', new Date())
        return timeA.getTime() - timeB.getTime()
      })
    } else {
      processedData.sort((a, b) => a.date.localeCompare(b.date))
    }
    // Calcular el total de amount
    const totalAmount = processedData.reduce((sum, entry) => sum + entry.amount, 0)

    // Calcular el promedio
    let average: number
    if (period === 'day') {
      // Calcular promedio por hora
      average = Number((totalAmount / 24).toFixed(2))
    } else {
      // Calcular promedio por día para otros períodos
      const daysDifference = differenceInDays(since, until) + 1 // +1 porque incluimos ambos días
      average = Number((totalAmount / daysDifference).toFixed(2))
    }

    return {
      data: processedData,
      totalAmount: totalAmount,
      average: average,
      raw: res.data.hits,
    }
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    throw error
  }
}
export async function getLogVideo(resourceId: string): Promise<Blob> {
  const resourceResponse = await fetch(`${BASE_URL}/system/logs/resource/${resourceId}`, {
    method: 'GET',
    headers: {
      Authorization: `${API_TOKEN}`,
    },
  })

  if (!resourceResponse.ok) {
    throw new Error('Failed to fetch video resource information')
  }

  const resourceData = await resourceResponse.json()

  if (resourceData.code !== 'SUCCESS' || !resourceData.data.video_record) {
    throw new Error('Invalid video data received')
  }
  const videoUrl = `${BASE_URL}/system/static${resourceData.data.video_record}`
  const videoResponse = await fetch(videoUrl, {
    method: 'GET',
    headers: {
      Authorization: `${API_TOKEN}`,
    },
  })

  if (!videoResponse.ok) {
    throw new Error('Failed to fetch video')
  }

  return await videoResponse.blob()
}

export async function getPeakHour(period: string, type: string = 'door_openings') {
  try {
    const activityData = await getActivityLogs(period, type)
    const hourCounts: { [hour: string]: number } = {}

    // Procesar cada entrada de actividad
    activityData.raw.forEach((entry: any) => {
      const timestamp = parseISO(entry['@timestamp'])
      const hourKey = format(startOfHour(timestamp), 'HH:00')

      hourCounts[hourKey] = (hourCounts[hourKey] || 0) + 1
    })

    // Encontrar la hora con más actividad
    let peakHour = ''
    let maxCount = 0

    for (const [hour, count] of Object.entries(hourCounts)) {
      if (count > maxCount) {
        maxCount = count
        peakHour = hour
      }
    }

    // Calcular el porcentaje de actividad en la hora punta
    const totalActivity = Object.values(hourCounts).reduce((sum, count) => sum + count, 0)
    const peakPercentage = totalActivity > 0 ? (maxCount / totalActivity) * 100 : 0

    return {
      peakHour,
      activityCount: maxCount,
      percentage: Number(peakPercentage.toFixed(2)),
    }
  } catch (error) {
    console.error('Error calculating peak hour:', error)
    throw error
  }
}

export async function getRevenue(period: string, type: string = 'admin_activity') {
  try {
    const eventsData = await getActivityLogs(period, type)
    const visitors = await getVisitors()
    const visitorMap = new Map(visitors.data.map((visitor: VisitorData) => [visitor.id, visitor]))

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
    const revenuePerUser = totalAmount > 0 ? totalRevenue / totalAmount : 0
    return {
      data: revenueData,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      revenuePerUser: Number(revenuePerUser.toFixed(2)),
    }
  } catch (error) {
    console.error('Error calculating revenue:', error)
    throw error
  }
}

export async function getAges() {
  try {
    const visitors = await getVisitors()

    const ageRanges = [
      { range: '15-20', min: 15, max: 20 },
      { range: '20-30', min: 20, max: 30 },
      { range: '30-40', min: 30, max: 40 },
      { range: '40-50', min: 40, max: 50 },
      { range: '50-60', min: 50, max: 60 },
      { range: '60+', min: 60, max: 150 },
    ]

    const validStatuses = ['VISITED', 'ACTIVE', 'UPCOMING']

    let totalAge = 0
    let validVisitorsCount = 0

    const ageCounts = ageRanges.map((range) => ({
      ages: range.range,
      amount: visitors.data.filter((visitor: VisitorData) => {
        const age = visitor.age
        if (
          visitor.status &&
          validStatuses.includes(visitor.status) &&
          age !== undefined &&
          age >= range.min &&
          age < range.max
        ) {
          totalAge += age
          validVisitorsCount++
          return true
        }
        return false
      }).length,
    }))

    const averageAge = validVisitorsCount > 0 ? totalAge / validVisitorsCount : 0

    return {
      data: ageCounts,
      average: parseFloat(averageAge.toFixed(2)),
    }
  } catch (error) {
    console.error('Error en getAges:', error)
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
//EDIT SCHEDULE
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
//DELETE SCHEDULE
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

//DOOR OPENING

export async function handleDoor(type: DoorOperation, durationMinutes?: number) {
  if (!BASE_URL || !API_TOKEN || !GYM_DOOR_ID) {
    throw new Error('Required environment variables are missing')
  }

  try {
    let endpoint = `${BASE_URL}/doors/${GYM_DOOR_ID}/`
    let body: any = {}
    let method = 'PUT'

    if (type === 'open') {
      if (durationMinutes !== undefined) {
        endpoint += 'lock_rule'
        body = {
          type: 'custom',
          interval: durationMinutes,
        }
      } else {
        endpoint += 'unlock'
        method = 'PUT'
        body = {} // El cuerpo estará vacío para la operación de desbloqueo remoto
      }
    } else {
      endpoint += 'lock_rule'
      body = {
        type: 'keep_lock',
      }
    }

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.code !== 'SUCCESS') {
      throw new Error(`API error: ${data.msg}`)
    }

    let actionMessage = ''
    if (type === 'open') {
      if (durationMinutes !== undefined) {
        const endDate = addMinutes(new Date(), durationMinutes)
        const formattedDate = format(endDate, "d 'de' MMMM 'a las' HH:mm", { locale: es })
        actionMessage = `La puerta se ha abierto y permanecerá abierta hasta el ${formattedDate}`
      } else {
        actionMessage = 'La puerta se ha desbloqueado'
      }
    } else {
      actionMessage = 'La puerta se ha cerrado y permanecerá cerrada indefinidamente'
    }

    return {
      success: true,
      actionMessage: actionMessage,
    }
  } catch (error) {
    console.error('Failed to handle door operation:', error)
    return {
      success: false,
      message: 'Ha ocurrido un error al manejar la puerta',
    }
  }
}
