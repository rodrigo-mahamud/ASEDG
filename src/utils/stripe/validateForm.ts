import { StripeField } from '@/types/types-stripe'
import { z } from 'zod'
import { validateDNINIE } from '../bookingValidations'
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
export const createFormSchema = (fields: StripeField[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {
    name: z.string().min(2, { message: `Revisa Nombre, esta incompleto` }),
    surname: z.string().min(2, { message: `Revisa Apellido, esta incompleto` }),
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
    dni: z.string().refine(validateDNINIE, { message: 'DNI o NIE español inválido' }),
  }

  fields.forEach((field) => {
    let validator: z.ZodTypeAny

    validator = z.string().min(3, { message: `${field.fieldLabel} esta incompleto` })

    schemaFields[field.fieldLabel] = validator
  })

  return z.object(schemaFields)
}

export type FormSchema = ReturnType<typeof createFormSchema>
export type FormDataTypes<T extends FormSchema> = z.infer<T>

export const createStripeForm = (fields: StripeField[]) => {
  const schema = createFormSchema(fields)
  return {
    schema,
    type: {} as z.infer<typeof schema>,
  }
}
