import slug from '../fields/slug'
import type { CollectionConfig } from 'payload'
import CallToAction from '../blocks/CallToAction'
import BentoBlock from '../blocks/Bento'
import TabsBlock from '../blocks/Tabs'
import TextImagesBlock from '../blocks/TextImages'
import CardsBlock from '../blocks/Cards'
import NewsBlock from '../blocks/News'
import NewsPinged from '../blocks/NewsPinged'
import BookingsBlock from '../blocks/Bookings'
import formatSlug from '@/utils/formatSlug'

const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  admin: {
    useAsTitle: 'adminPanelTitle',
    preview: (doc) => {
      if (doc?.id) {
        return `http://${process.env.ROOT_DOMAIN}/preview/${doc.id}`
      }
      return null
    },
  },
  fields: [
    {
      name: 'adminPanelTitle',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data) {
              return data.header?.title || ''
            }
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cabecera',
          name: 'header',
          fields: [
            {
              name: 'pagetype',
              label: 'Tipo de Página',
              type: 'select',
              options: [
                {
                  label: 'Página de inicio',
                  value: 'indexPage',
                },
                {
                  label: 'Página principal de noticias',
                  value: 'newsPage',
                },
                {
                  label: 'Página principal de Instalacciones deportivas',
                  value: 'facilitiesPage',
                },
                {
                  label: 'Página estandar',
                  value: 'standarPage',
                },
              ],
              required: true,
            },
            {
              name: 'style',
              label: 'Estilo de la cabecera',
              type: 'select',
              options: [
                {
                  label: 'Cabecera de Inicio',
                  value: 'index',
                },
                {
                  label: 'Cabecera de Página',
                  value: 'glow',
                },
                {
                  label: 'Cabecera 2',
                  value: 'grid',
                },
              ],
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: 'Titulo',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'pretitle',
                  label: 'Pretitulo',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'newsFour',
              type: 'relationship',
              relationTo: 'news',
              label: 'Noticias destacadas (8 ultimas por defecto)',
              hasMany: true,
              maxRows: 8,
              admin: {
                condition: (_, siblingData) => siblingData.style === 'index',
              },
            },
            {
              name: 'description',
              label: 'Descripción',
              type: 'textarea',
              admin: {
                width: '100%',
              },
              required: true,
            },

            {
              name: 'displaydate',
              type: 'checkbox',
              label: '¿Mostrar la fehca en la cabecera?',
              required: false,
              admin: {
                condition: (_, siblingData) => siblingData.style === 'glow',
              },
            },
          ],
        },
        {
          label: 'Cuerpo',
          name: 'body',
          fields: [
            {
              name: 'layout',
              label: ' ',
              labels: {
                singular: 'Seccion',
                plural: 'Secciones',
              },
              type: 'blocks',
              blocks: [
                TabsBlock,
                CallToAction,
                BentoBlock,
                TextImagesBlock,
                CardsBlock,
                NewsBlock,
                NewsPinged,
                BookingsBlock,
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
    {
      name: 'slug',
      label: 'Slug (Url de esta página)',
      required: true,
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData.header?.pagetype === 'standarPage',
      },
      hooks: {
        beforeChange: [formatSlug('header', 'titleIndex')],
      },
    },
  ],
}
export default Pages
