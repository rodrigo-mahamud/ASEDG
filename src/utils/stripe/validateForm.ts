import { StripeField } from '@/types/types-stripe'
import { z } from 'zod'

export const createFormSchema = (fields: StripeField[]) => {
  const schemaFields = fields.reduce(
    (acc, field) => {
      let validator
      switch (field.fieldType) {
        case 'email':
          validator = z.string().email({ message: 'Email inválido' })
          break
        case 'number':
          validator = z.number().min(0, { message: 'Debe ser un número positivo' })
          break
        default:
          validator = z.string().min(1, { message: 'Este campo es requerido' })
      }
      acc[field.fieldName] = validator
      return acc
    },
    {} as Record<string, z.ZodTypeAny>,
  )

  return z.object(schemaFields)
}

export type FormSchema = ReturnType<typeof createFormSchema>
export type FormDataTypes<T extends FormSchema> = z.infer<T>

// Función auxiliar para crear tanto el esquema como el tipo de datos
export const createStripeForm = (fields: StripeField[]) => {
  const schema = createFormSchema(fields)
  return {
    schema,
    type: {} as z.infer<typeof schema>,
  }
}
