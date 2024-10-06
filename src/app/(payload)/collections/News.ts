import { CollectionConfig } from 'payload'
import updateNews from '@/utils/updateNews'
import subslug from '../fields/subslug'

const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (doc?.id) {
        return `http://${process.env.ROOT_DOMAIN}/preview/news/${doc.id}`
      }
      return null
    },
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
          name: 'style',
          label: 'Estilo de la cabecera',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Vertical',
              value: 'vertical',
            },
            {
              label: 'Horizontal',
              value: 'horizontal',
            },
            {
              label: 'Video',
              value: 'video',
            },
            {
              label: 'Galería de imágenes',
              value: 'masonry',
            },
          ],
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
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data) => ['vertical', 'horizontal', 'video'].includes(data.style),
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL del video',
      required: true,
      admin: {
        condition: (data) => data.style === 'video',
      },
    },
    {
      type: 'group',
      name: 'masonryImages',
      label: 'Images Galería',
      admin: {
        className: 'masonry-image-group',
        condition: (data) => data.style === 'masonry',
      },
      fields: [
        {
          name: 'masonryImage1',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'masonryImage2',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'masonryImage3',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'masonryImage4',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'masonryImage5',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'newsRelated',
      label: 'Noticias Relacionadas (4 como minimo) Nota: hacerlo automatico',
      type: 'relationship',
      relationTo: 'news',
      required: true,
      hasMany: true,
      maxRows: 4,
    },
    {
      name: 'richtxtcontent',
      label: 'Contenido de la noticia:',
      type: 'richText',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Adjuntos',
      admin: {
        position: 'sidebar',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Archivo',
          relationTo: 'media',
          required: false,
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
      name: 'categories',
      label: 'Categorias',
      type: 'relationship',
      relationTo: 'cat',
      hasMany: true,
      maxRows: 2,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      label: 'Fecha de publicación',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    subslug,
  ],
  hooks: {
    afterChange: [updateNews],
    afterDelete: [updateNews],
  },
}

export default News
