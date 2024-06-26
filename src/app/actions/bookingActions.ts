// app/actions/bookingActions.ts
'use server'
import { z } from 'zod'
const bookingSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  // Añade otros campos necesarios para Unifi Access
})

async function createUnifiAccessToken(data: z.infer<typeof bookingSchema>) {
  const UNIFI_ACCESS_API_URL = process.env.UNIFI_ACCESS_API_URL
  const UNIFI_ACCESS_API_TOKEN = process.env.UNIFI_ACCESS_API_TOKEN

  try {
    const response = await fetch(`${UNIFI_ACCESS_API_URL}/access-tokens`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UNIFI_ACCESS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
  const data = Object.fromEntries(formData)
  const validatedData = bookingSchema.parse(data)

  try {
    // Aquí iría la lógica de pago si la implementas en el futuro

    // Crear token de acceso en Unifi Access
    const accessToken = await createUnifiAccessToken(validatedData)

    return {
      success: true,
      message: 'Reserva confirmada y acceso concedido',
      accessToken,
    }
  } catch (error) {
    console.error('Error al procesar la reserva:', error)
    return {
      success: false,
      message: 'Error al procesar la reserva',
    }
  }
}
