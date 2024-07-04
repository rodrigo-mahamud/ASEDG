// /utils/bookingValidations.ts
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

export const bookingSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre debe tener al menos 2 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre no puede contener números ni caracteres especiales',
    ),
  apellidos: z
    .string()
    .min(1, 'Los apellidos deben tener al menos 2 caracteres')
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
          'Por favor, utiliza tu dirección de correo personal no se admiten mails temporales',
      },
    ),
  telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Número de teléfono español inválido'),
  dni: z.string().refine(validateDNI, { message: 'DNI español inválido' }),
  periodo: z.number(),
  terminos: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
})

export type BookingFormTypes = z.infer<typeof bookingSchema>

// Función para validar el DNI español
export function validateDNI(dni: string): boolean {
  // Implementa la lógica de validación del DNI aquí
  return true // Placeholder
}
