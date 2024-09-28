import { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlug = (prefix?: string, field?: string): FieldHook => {
  return ({ value, data, operation, originalDoc }) => {
    if (operation === 'create' || operation === 'update') {
      // Si el valor ya existe y no está vacío, respetamos lo que el usuario ha escrito
      if (value && typeof value === 'string' && value.trim() !== '') {
        return format(value)
      }

      let fallbackData

      if (prefix && field) {
        // Buscar en data[prefix][field]
        fallbackData = data?.[prefix]?.[field]
      } else if (prefix && !field) {
        // Buscar directamente en data[prefix]
        fallbackData = data?.[prefix]
      }

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }

      // Si estamos en una operación de actualización y no hay un nuevo valor,
      // mantenemos el valor original del documento
      if (operation === 'update' && originalDoc && originalDoc.slug) {
        return originalDoc.slug
      }
    }

    // Si no se pudo obtener el valor del fallback y no hay valor original, devolvemos el valor actual
    if (typeof value === 'string') {
      return format(value)
    }

    return value
  }
}

export default formatSlug
