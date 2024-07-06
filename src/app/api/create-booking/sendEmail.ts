import { render } from '@react-email/components'
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail'
import { BookingFormTypes } from '@/utils/bookingValidations'
import { Payload } from 'payload'

export async function sendEmail(
  payload: Payload,
  bookingData: BookingFormTypes,
  startTime: number,
  endTime: number,
  pinCode: string,
) {
  try {
    // Generar el HTML del correo electrónico usando React Email
    const emailHtml = render(
      BookingConfirmationEmail({
        nombre: bookingData.nombre,
        apellidos: bookingData.apellidos,
        email: bookingData.email,
        telefono: bookingData.telefono,
        fechaInicio: new Date(startTime * 1000).toLocaleString(),
        fechaFin: new Date(endTime * 1000).toLocaleString(),
        pinCode: pinCode,
      }),
    )

    // Enviar correo electrónico usando Payload
    await payload.sendEmail({
      to: bookingData.email,
      subject: 'Registro exitoso en el gimnasio',
      html: emailHtml,
    })
    console.log('Correo electrónico enviado con éxito')
  } catch (emailError) {
    console.error('Error al enviar el correo electrónico:', emailError)
    throw new Error('Failed to send email')
  }
}
