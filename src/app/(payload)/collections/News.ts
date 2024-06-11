import { buildConfig } from 'payload/config'
import { CollectionConfig } from 'payload/types'
import path from 'path'

const News: CollectionConfig = {
  slug: 'noticias',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
      required: true,
    },
    {
      name: 'categorias',
      type: 'relationship',
      relationTo: 'cat',
      hasMany: true,
      maxRows: 2,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media', // Suponiendo que tienes una colección de medios para subir archivos
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Adjuntos',
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Archivo',
          relationTo: 'media', // Suponiendo una colección de medios
          required: true,
        },
      ],
    },
  ],
}
export default News
