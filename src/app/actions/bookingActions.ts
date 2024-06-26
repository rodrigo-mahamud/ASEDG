// app/actions/bookingActions.ts
'use server'

import { z } from 'zod'
import dayjs from 'dayjs'

// Función para validar el DNI español
const validateDNI = (dni: string) => {
  const dniRegex = /^(\d{8})([A-Z])$/
  const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE'

  const match = dni.match(dniRegex)
  if (!match) return false

  const number = parseInt(match[1])
  const letter = match[2]

  return validLetters.charAt(number % 23) === letter
}

const bookingSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  edad: z.number().min(16, 'Debes ser mayor de 16 años'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
  dni: z.string().refine(validateDNI, {
    message: 'DNI español inválido',
  }),
  periodo: z.enum(['un_dia', 'un_mes', 'tres_meses']),
})

async function createUnifiAccessToken(data: z.infer<typeof bookingSchema>) {
  const UNIFI_ACCESS_API_URL = process.env.UNIFI_ACCESS_API_URL
  const UNIFI_ACCESS_API_TOKEN = process.env.UNIFI_ACCESS_API_TOKEN

  // Calcular la fecha de finalización basada en el período
  const startDate = dayjs()
  let endDate
  switch (data.periodo) {
    case 'un_dia':
      endDate = startDate.add(1, 'day')
      break
    case 'un_mes':
      endDate = startDate.add(1, 'month')
      break
    case 'tres_meses':
      endDate = startDate.add(3, 'months')
      break
  }

  const accessData = {
    ...data,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }

  try {
    const response = await fetch(`${UNIFI_ACCESS_API_URL}/access-tokens`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UNIFI_ACCESS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accessData),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al crear el token de acceso:', error)
    throw error
  }
}

export async function createBookingAndGrantAccess(formData: FormData) {
  const rawData = Object.fromEntries(formData)

  try {
    const validatedData = bookingSchema.parse({
      ...rawData,
      edad: parseInt(rawData.edad as string),
    })

    // Crear token de acceso en Unifi Access
    const accessToken = await createUnifiAccessToken(validatedData)

    return {
      success: true,
      message: 'Reserva confirmada y acceso concedido',
      accessToken,
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
