import * as z from 'zod'

export const visitorSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  dni: z.string().min(1, 'El DNI es requerido'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'La edad debe ser un número positivo',
  }),
})

export type VisitorFormValues = z.infer<typeof visitorSchema>
