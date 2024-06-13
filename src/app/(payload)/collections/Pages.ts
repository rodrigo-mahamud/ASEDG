import slug from '../fields/slug'
import type { CollectionConfig } from 'payload/types'
import CallToAction from '../blocks/CallToAction'
import BentoBlock from '../blocks/Bento'
import TabsBlock from '../blocks/Tabs'
import TextImagesBlock from '../blocks/TextImages'
import CardsBlock from '../blocks/Cards'
import NewsList from '../blocks/News'

import { afterChange, afterDelete } from '@/utils/updateNews'

const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: false,
  },
  admin: {
    useAsTitle: 'slug',
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
                  value: 'inicio',
                },
                {
                  label: 'Cabecera de Página',
                  value: 'pagina',
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
                    condition: (_, siblingData) => siblingData.style === 'inicio',
                  },
                },
                {
                  name: 'pretitleIndex',
                  label: 'Pretitulo',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'inicio',
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
                condition: (_, siblingData) => siblingData.style === 'inicio',
              },
              required: true,
            },
            {
              type: 'row',

              fields: [
                {
                  name: 'newsRelationship',
                  type: 'relationship',
                  relationTo: 'news',
                  label: 'Noticias destacadas (4 ultimas por defecto)',
                  hasMany: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'inicio',
                  },
                },
                {
                  name: 'newsLimit',
                  label: 'Nº de noticias destacadas',
                  type: 'select',
                  options: [
                    {
                      label: '4',
                      value: '4',
                    },
                    {
                      label: '8',
                      value: '8',
                    },
                  ],
                  defaultValue: '4',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'inicio',
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
                condition: (_, siblingData) => siblingData.style === 'pagina',
              },
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData.style === 'pagina',
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
              blocks: [TabsBlock, CallToAction, BentoBlock, TextImagesBlock, CardsBlock, NewsList],
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
