import { NextResponse } from 'next/server'
import { z } from 'zod'
import dayjs from 'dayjs'
import { bookingSchema, BookingFormTypes } from '@/utils/bookingValidations'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCredentials } from './getCredentials'
import { sendEmail } from './sendEmail'

function calculatePeriodTimes(days: number): { startTime: number; endTime: number | null } {
  const now = dayjs()
  const startTime = now.unix()
  const endTime = days > 0 ? now.add(days, 'day').unix() : null
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
    remarks: `Edad: ${data.edad} años - ¿Términos aceptados? ${data.terminos}`,
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
  try {
    console.log('Iniciando registro de datos del visitante...')
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

    const result = await apiResponse.json()
    console.log('Datos del visitante registrados con éxito')
    return result
  } catch (error) {
    console.error('Error posting visitor data:', error)
    throw new Error('Failed to register visitor data')
  }
}

export async function POST(request: Request) {
  console.log('API Route: create-booking iniciada')

  try {
    const body = await request.json()
    console.log('Datos recibidos en la API:', body)

    console.log('Iniciando proceso de reserva y concesión de acceso...')

    console.log('Validando datos del formulario...')
    const validatedData: BookingFormTypes = bookingSchema.parse(body)
    console.log('Datos del formulario validados con éxito:', validatedData)

    console.log('Calculando tiempos del período...')
    const { startTime, endTime } = calculatePeriodTimes(validatedData.periodo)

    if (!endTime) {
      throw new Error('Período no válido proporcionado')
    }

    const pinCode = await getCredentials()
    const visitorData = prepareVisitorData(validatedData, startTime, endTime, pinCode)
    const result = await postVisitorData(visitorData)

    // Obtener la instancia de Payload
    const payload = await getPayload({ config: configPromise })

    // Enviar correo electrónico
    await sendEmail(payload, validatedData, startTime, endTime, pinCode)

    // Imprimir todos los datos del usuario y el código PIN por consola
    console.log('Datos del usuario registrado:', {
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
      remarks: validatedData.terminos,
    })

    return NextResponse.json({
      success: true,
      message: 'Reserva confirmada y acceso concedido',
      accessToken: result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Error en los datos del formulario',
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    if (error instanceof Error) {
      if (error.message === 'Failed to fetch gym credentials') {
        return NextResponse.json(
          {
            success: false,
            message:
              'Error al obtener las credenciales del gimnasio. Por favor, inténtelo de nuevo más tarde.',
            errorDetails: error.stack,
          },
          { status: 500 },
        )
      }
      if (error.message === 'Failed to register visitor data') {
        return NextResponse.json(
          {
            success: false,
            message:
              'Error al registrar los datos del visitante. Por favor, inténtelo de nuevo más tarde.',
            errorDetails: error.stack,
          },
          { status: 500 },
        )
      }
      if (error.message === 'Failed to send email') {
        return NextResponse.json(
          {
            success: false,
            message:
              'Error al enviar el correo electrónico de confirmación. Por favor, inténtelo de nuevo más tarde.',
            errorDetails: error.stack,
          },
          { status: 500 },
        )
      }
      return NextResponse.json(
        {
          success: false,
          message: `Error al procesar la reserva: ${error.message}`,
          errorDetails: error.stack,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'Error desconocido al procesar la reserva. Por favor, inténtelo de nuevo más tarde.',
        errorDetails: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}
