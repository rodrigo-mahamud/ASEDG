// app/actions/bookingActions.ts
'use server'

import { z } from 'zod'
import dayjs from 'dayjs'

const bookingSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  edad: z.number().min(16, 'Debes ser mayor de 16 años'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
  dni: z.string().refine(validateDNI, { message: 'DNI español inválido' }),
  periodo: z.enum(['un_dia', 'un_mes', 'tres_meses']),
})

async function handleCredentials() {
  try {
    const response = await fetch(process.env.SECRET_GYM_CREDENTIALS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.SECRET_GYM_CREDENTIALS_API_TOKEN!,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching gym credentials:', error)
    throw error
  }
}

async function handleEmail(emailData: any) {
  // Implementa la lógica de envío de email aquí
  // Por ahora, solo simularemos el envío
  console.log('Simulando envío de email:', emailData)
}

function calculatePeriodTimes(period: string): { startTime: number; endTime: number | null } {
  const periodMap = { un_dia: 1, un_mes: 30, tres_meses: 90 }
  const days = periodMap[period as keyof typeof periodMap]
  const now = dayjs()
  const startTime = now.unix()
  const endTime = days ? now.add(days, 'day').unix() : null
  return { startTime, endTime }
}

function prepareVisitorData(
  data: z.infer<typeof bookingSchema>,
  startTime: number,
  endTime: number,
  pinCode: string,
) {
  return {
    first_name: data.nombre,
    last_name: data.apellidos,
    mobile_phone: data.telefono,
    email: data.email,
    remarks: `Edad: ${data.edad} años - Terminos aceptados`,
    start_time: startTime,
    end_time: endTime,
    visit_reason: 'Others',
    week_schedule: defaultWeekSchedule(),
    resources: [{ id: process.env.SECRET_GYM_DOOR_ID, type: 'door' }],
    pin_code: pinCode,
  }
}

function defaultWeekSchedule() {
  const timeSlots = { start_time: '08:45:00', end_time: '22:45:59' }
  return {
    monday: [timeSlots],
    tuesday: [timeSlots],
    wednesday: [timeSlots],
    thursday: [timeSlots],
    friday: [timeSlots],
    saturday: [timeSlots],
    sunday: [timeSlots],
  }
}

async function postVisitorData(visitorData: any) {
  const apiURL = process.env.SECRET_GYM_REGISTER_API_URL!
  const apiResponse = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.SECRET_GYM_REGISTER_API_TOKEN!,
    },
    body: JSON.stringify(visitorData),
  })

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text()
    throw new Error(`Error en la respuesta de la API: ${errorText}`)
  }

  return await apiResponse.json()
}

export async function createBookingAndGrantAccess(formData: FormData) {
  const rawData = Object.fromEntries(formData)

  try {
    const validatedData = bookingSchema.parse({
      ...rawData,
      edad: parseInt(rawData.edad as string),
    })

    const { startTime, endTime } = calculatePeriodTimes(validatedData.periodo)

    if (endTime) {
      const pinCode = await handleCredentials()
      const visitorData = prepareVisitorData(validatedData, startTime, endTime, pinCode)
      const result = await postVisitorData(visitorData)

      // Imprimir todos los datos del usuario y el código PIN por consola
      console.log('Datos del usuario registrado:')
      console.log({
        nombre: validatedData.nombre,
        apellidos: validatedData.apellidos,
        edad: validatedData.edad,
        email: validatedData.email,
        telefono: validatedData.telefono,
        dni: validatedData.dni,
        periodo: validatedData.periodo,
        fechaInicio: new Date(startTime * 1000).toLocaleString(),
        fechaFin: new Date(endTime * 1000).toLocaleString(),
        pinCode: pinCode,
      })

      return {
        success: true,
        message: 'Reserva confirmada y acceso concedido',
        accessToken: result, // Asumiendo que el resultado de la API contiene el token de acceso
      }
    } else {
      throw new Error('Período no válido proporcionado')
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error de validación:', error.errors)
      return {
        success: false,
        message: 'Error en los datos del formulario',
        errors: error.errors,
      }
    }
    console.error('Error al procesar la reserva:', error)
    return {
      success: false,
      message: 'Error al procesar la reserva',
    }
  }
}

// Función para validar el DNI español (implementa esta función según tus necesidades)
function validateDNI(dni: string): boolean {
  // Implementa la lógica de validación del DNI aquí
  return true // Placeholder
}
