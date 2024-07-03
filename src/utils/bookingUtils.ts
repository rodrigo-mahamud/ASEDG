import { BookingFormData } from './bookingValidations'

const API_URL = process.env.NEXT_PUBLIC_API_URL // Asegúrate de tener esta variable de entorno configurada

export async function createBooking(formData: BookingFormData) {
  const response = await fetch('/api/create-booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.message)
  }

  return result
}

export async function checkSystemAvailability() {
  try {
    const response = await fetch(`${API_URL}/api/v1/developer/visitors?page_size=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Asegúrate de tener esta variable de entorno configurada
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        return { status: 'OK', message: 'El sistema de reservas está disponible' }
      } else {
        return {
          status: 'ERROR',
          message: 'El sistema de reservas no está devolviendo datos correctamente',
        }
      }
    } else {
      return {
        status: 'ERROR',
        message: 'El sistema de reservas no está respondiendo correctamente',
      }
    }
  } catch (error) {
    console.error('Error al verificar el sistema de reservas:', error)
    return { status: 'ERROR', message: 'Error al verificar el sistema de reservas' }
  }
}
