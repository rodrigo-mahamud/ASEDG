import { CollectionConfig } from 'payload/types'
import slug from '../fields/slug'

import RichText from '../blocks/RichText'
import updateNews from '@/utils/updateNews'
import validateNews from '@/utils/validateNews'

const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
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
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
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
      name: 'layout',
      label: ' ',
      labels: {
        singular: 'Seccion',
        plural: 'Secciones',
      },
      type: 'blocks',
      maxRows: 1,
      blocks: [RichText],
    },

    {
      name: 'attachments',
      type: 'array',
      label: 'Adjuntos',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Archivo',
          relationTo: 'media', // TODO: coleccion para archivos rollo pdf y asi
          required: true,
        },
      ],
    },
    {
      name: 'fixed',
      type: 'checkbox',
      label: 'Mantener noticia fijada',
      admin: {
        position: 'sidebar',
      },
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
    // beforeChange: [validateNews],
    afterChange: [updateNews],
    afterDelete: [updateNews],
  },
}

export default News
