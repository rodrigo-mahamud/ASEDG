import * as z from 'zod'

const prohibitedDomains = [
  'mohmal.com',
  'yopmail.com',
  'emailondeck.com',
  'tempail.com',
  'bupmail.com',
  'emailfake.com',
  'guerrillamail.com',
  'crazymailing.com',
  'tempr.email',
  'throwawaymail.com',
  'maildrop.cc',
  '10minutemail.com',
  'getnada.com',
  'mintemail.com',
]

// Función para validar el DNI/NIE español
export function validateDNINIE(value: string): boolean {
  const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
  const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i

  if (!dniRegex.test(value) && !nieRegex.test(value)) {
    return false
  }

  let numero: string
  let letra: string
  let letraCalculada: string

  if (value.startsWith('X') || value.startsWith('Y') || value.startsWith('Z')) {
    // Es un NIE
    const firstLetter = value[0]
    numero = value.slice(1, 8)
    letra = value[8]

    // Reemplazar X, Y, Z con 0, 1, 2
    if (firstLetter === 'X') numero = '0' + numero
    else if (firstLetter === 'Y') numero = '1' + numero
    else if (firstLetter === 'Z') numero = '2' + numero
  } else {
    // Es un DNI
    numero = value.slice(0, 8)
    letra = value[8]
  }

  // Calcular la letra
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const resto = parseInt(numero) % 23
  letraCalculada = letras[resto]

  return letra.toUpperCase() === letraCalculada
}

export const bookingSchema = z.object({
  nombre: z
    .string()
    .min(1, 'No has rellenado el campo nombre')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre no puede contener números ni caracteres especiales',
    ),
  apellidos: z
    .string()
    .min(1, 'No has rellenado el campo apellidos')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'Los apellidos no pueden contener números ni caracteres especiales',
    ),
  edad: z.number().min(16, 'Debes ser mayor de 16 años'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .refine(
      (email) => !prohibitedDomains.some((domain) => email.toLowerCase().endsWith(`@${domain}`)),
      {
        message:
          'Por favor, utiliza tu dirección de correo personal no se admiten emails temporales',
      },
    ),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
  dni: z.string().refine(validateDNINIE, { message: 'DNI o NIE español inválido' }),
  daysAmount: z.number().min(1, 'Debes seleccionar un período de reserva'),
  terminos: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
})

export type BookingFormTypes = z.infer<typeof bookingSchema>
