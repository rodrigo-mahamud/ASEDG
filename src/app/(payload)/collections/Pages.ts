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
    useAsTitle: 'slug',
    preview: (doc) => {
      if (doc?.id) {
        return `http://${process.env.ROOT_DOMAIN}/preview/${doc.id}`
      }
      return null
    },
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
              name: 'style',
              label: 'Tipo de cabecera.',
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
                  name: 'titleIndex',
                  label: 'Titulo',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'index',
                  },
                },
                {
                  name: 'pretitleIndex',
                  label: 'Pretitulo',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'index',
                  },
                },
              ],
            },
            {
              name: 'description',
              label: 'Descripción',
              type: 'textarea',
              admin: {
                width: '100%',
                condition: (_, siblingData) => siblingData.style === 'index',
              },
              required: true,
            },
            {
              type: 'row',

              fields: [
                {
                  name: 'newsFour',
                  type: 'relationship',
                  relationTo: 'news',
                  label: 'Noticias destacadas (4 ultimas por defecto)',
                  hasMany: true,
                  maxRows: 8,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'index',
                  },
                },
              ],
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
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData.style === 'glow',
              },
              fields: [
                {
                  name: 'title',
                  required: true,
                  label: 'Titulo de la cabecera',
                  type: 'text',
                },
                {
                  name: 'pretitle',
                  required: true,
                  label: 'Preitulo de la cabecera',
                  type: 'text',
                },
              ],
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
    slug,
  ],
}
export default Pages
