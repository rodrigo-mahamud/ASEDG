import { GlobalConfig } from 'payload'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { toast } from '@payloadcms/ui'
import { Validate } from 'payload'

const validateImageDimensions: Validate<any, any> = async (value) => {
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

    if (media.width !== 195 || media.height !== 195) {
      return 'La imagen debe ser exactamente de 195x195 píxeles.'
    }
    if (media.mimeType !== 'image/png') {
      return 'La imagen debe estar en PNG.'
    }
    return true
  } catch (error) {
    toast.error(`Error al validar la imagen`)
    return 'Error al validar la imagen'
  }
}

const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Titulo por defecto',
      required: true,
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Descripción por defecto',
      required: true,
    },
    {
      name: 'faviconLight',
      type: 'upload',
      relationTo: 'media',
      label: 'Icono del sitio - modo claro',
      validate: validateImageDimensions,
      required: false,
      admin: {
        description:
          'Para dispositivos con el navegador en modo claro. Debe ser una imagen PNG de 195x195 píxeles.',
      },
    },
    {
      name: 'faviconDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Icono del sitio - modo oscuro',
      validate: validateImageDimensions,
      required: false,
      admin: {
        description:
          'Para dispositivos con el navegador en modo oscuro. Debe ser una imagen PNG de 195x195 píxeles.',
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen por defecto del sitio.',
      required: false,
    },
  ],
}

export default Settings
