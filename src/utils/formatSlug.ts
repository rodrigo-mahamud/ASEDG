import { FieldHook } from 'payload/types'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value)
    }

    // Obtén el valor de `header[fallback]`
    const fallbackData =
      (data && data.header && data.header[fallback]) ||
      (originalDoc && originalDoc.header && originalDoc.header[fallback])

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData)
    }

    return value
  }

export default formatSlug
