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
