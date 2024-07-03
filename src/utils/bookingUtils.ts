import { BookingFormTypes } from './bookingValidations'
import useFormStore from './useBookingState'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createBooking(formData: BookingFormTypes) {
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
  const { setErrorState, setErrorDetails } = useFormStore.getState()

  try {
    const response = await fetch(`${API_URL}/api/v1/developer/visitors?page_size=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        return true
      } else {
        setErrorDetails('El sistema de reservas no está devolviendo datos correctamente')
        setErrorState()
        return false
      }
    } else {
      setErrorDetails('El sistema de reservas no está respondiendo correctamente')
      setErrorState()
      return false
    }
  } catch (error) {
    console.error('Error al verificar el sistema de reservas:', error)
    setErrorDetails('Error al verificar el sistema de reservas')
    setErrorState()
    return false
  }
}
