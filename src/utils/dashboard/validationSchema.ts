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
function validateDNINIE(value: string): boolean {
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
const getStartOfToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.floor(today.getTime() / 1000)
}
export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_phone: '',
  dni: '',
  age: undefined,
  end_time: undefined,
  start_time: undefined,
}
export const visitorSchema = z
  .object({
    id: z.string().optional(),
    first_name: z
      .string()
      .min(1, 'El nombre debe tener al menos 2 caracteres')
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        'El nombre no puede contener números ni caracteres especiales',
      ),
    last_name: z
      .string()
      .min(1, 'Los apellidos deben tener al menos 2 caracteres')
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        'Los apellidos no pueden contener números ni caracteres especiales',
      ),
    email: z
      .string()
      .email('Correo electrónico inválido')
      .refine(
        (email) => !prohibitedDomains.some((domain) => email.toLowerCase().endsWith(`@${domain}`)),
        {
          message:
            'Por favor, utiliza tu dirección de correo personal no se admiten mails temporales',
        },
      ),
    mobile_phone: z
      .string()
      .regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
    dni: z.string().refine(validateDNINIE, { message: 'DNI o NIE español inválido' }),
    age: z.number().min(16, 'Debes ser mayor de 16 años'),
    start_time: z
      .number()
      .min(getStartOfToday(), { message: 'Debes introducir una fecha futura' })
      .optional(),
    end_time: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return data.end_time > data.start_time
      }
      return true
    },
    {
      message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      path: ['end_time'],
    },
  )

export type VisitorFormValues = z.infer<typeof visitorSchema>
