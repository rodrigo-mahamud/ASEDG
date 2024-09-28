import { FieldHook } from 'payload'

const formatSlug = (val: string): string => {
  return val
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

const formatSlugHook = (prefix?: string, field?: string): FieldHook => {
  return (args) => {
    const { value, data } = args

    let valueToFormat: string | undefined

    if (prefix && field) {
      valueToFormat = data?.[prefix]?.[field]
    } else if (prefix) {
      valueToFormat = data?.[prefix]
    } else {
      valueToFormat = value as string
    }

    if (typeof valueToFormat === 'string') {
      return formatSlug(valueToFormat)
    }

    // Si no se encuentra un valor válido, devolvemos una cadena vacía o algún valor predeterminado
    return ''
  }
}

export default formatSlugHook
