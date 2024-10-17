import { Validate } from 'payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const validateImage = (
  width?: number,
  height?: number,
  format?: string,
): Validate<any, any> => {
  return async (value) => {
    if (!value) return true // Si no hay valor, no validamos (a menos que el campo sea requerido)
    const payload = await getPayloadHMR({ config: configPromise })
    try {
      const media = await payload.findByID({
        collection: 'media',
        id: value,
      })
      if (!media?.url) {
        return 'Imagen no encontrada'
      }

      if (width !== undefined && media.width !== width) {
        return `El ancho de la imagen debe ser exactamente ${width} píxeles.`
      }
      if (height !== undefined && media.height !== height) {
        return `La altura de la imagen debe ser exactamente ${height} píxeles.`
      }
      if (format !== undefined && media.mimeType !== `image/${format}`) {
        return `La imagen debe estar en formato ${format.toUpperCase()}.`
      }
      return true
    } catch (error) {
      return 'Error al validar la imagen'
    }
  }
}
