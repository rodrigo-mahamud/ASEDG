import { buildConfig } from 'payload/config'
import { CollectionConfig } from 'payload/types'
import path from 'path'
import useUpdateNews from '@/hooks/useUpdateNews'
import slug from '../fields/slug'
import NewsList from '../blocks/News'

const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'header.title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cabecera',
          name: 'header',
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
          ],
        },
        {
          label: 'Cuerpo',
          name: 'body',
          fields: [
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
        },
      ],
    },
    {
      name: 'publishedDate',
      label: 'Fecha de publicación',
      type: 'date',
      defaultValue: () => new Date().toISOString(), // Establecer la fecha actual por defecto
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    slug,
  ],
  hooks: {
    afterChange: [useUpdateNews],
  },
}

export default News
