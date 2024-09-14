import { CollectionConfig, FieldHook } from 'payload'
// import { APIError } from 'payload/errors' // Importa APIError
import slug from '../fields/slug'
import RichText from '../blocks/RichText'
import updateNews from '@/utils/updateNews'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Asegúrate de que esta ruta es correcta

// const checkFixedNewsLimit: FieldHook = async ({ data, req, originalDoc }) => {
//   if (data && data.fixed && (!originalDoc || !originalDoc.fixed)) {
//     const payload = await getPayloadHMR({ config: configPromise })

//     const { totalDocs } = await payload.find({
//       collection: 'news',
//       where: {
//         fixed: {
//           equals: true,
//         },
//       },
//     })

//     if (totalDocs >= 8) {
//       const error = new APIError('No puedes fijar más de 8 noticias.', 400)
//       error.isPublic = true // Establece el error como público
//       throw error
//     }
//   }

//   return data?.fixed ?? originalDoc?.fixed // Maneja el posible valor undefined de data y originalDoc
// }
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
          name: 'style',
          label: 'Estilo de la cabecera',
          type: 'select',

          required: true,
          options: [
            {
              label: 'Verical',
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
              label: 'Con mosaico',
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
    },
    {
      name: 'newsRelated',
      label: 'Noticias Relaccionadas',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 8,
    },

    { name: 'richtxtcontent', label: 'Contenido de la noticia:', type: 'richText' },

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
      // hooks: {
      //   beforeChange: [checkFixedNewsLimit],
      // },
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
    slug,
  ],
  hooks: {
    afterChange: [updateNews],
    afterDelete: [updateNews],
  },
}

export default News
