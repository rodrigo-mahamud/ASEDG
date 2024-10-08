import slug from '../fields/slug'
import formatSlug from '@/utils/formatSlug'
import type { CollectionConfig } from 'payload'
import configPromise from '@payload-config'
import { toast } from '@payloadcms/ui'
//BLOCKS
import CallToAction from '../blocks/CallToAction'
import BentoBlock from '../blocks/Bento'
import TabsBlock from '../blocks/Tabs'
import TextImagesBlock from '../blocks/TextImages'
import CardsBlock from '../blocks/Cards'
import NewsBlock from '../blocks/News'
import BookingsBlock from '../blocks/Bookings'
import RichText from '../blocks/RichText'
import Faqs from '../blocks/Faqs'
import StickyTextImages from '../blocks/StickyTextImages'
import StripeTPV from '../blocks/StripeTPV'
import { getPayloadHMR } from '@payloadcms/next/utilities'

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
        return `http://${process.env.ROOT_DOMAIN}/preview/pages/${doc.id}`
      }
      return null
    },
  },
  fields: [
    {
      name: 'adminPanelTitle',
      label: 'Título',
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
              type: 'row',
              fields: [
                {
                  name: 'pagetype',
                  label: 'Tipo de Página',
                  type: 'select',
                  options: [
                    {
                      label: 'Página estandar',
                      value: 'standarPage',
                    },
                    {
                      label: 'Página de inicio',
                      value: 'indexPage',
                    },
                    {
                      label: 'Página de noticias',
                      value: 'newsPage',
                    },
                    {
                      label: 'Página de Instalacciones deportivas',
                      value: 'facilitiesPage',
                    },
                  ],
                  defaultValue: 'standarPage',
                  required: true,
                  validate: async (value: any) => {
                    const uniqueTypes = ['indexPage', 'newsPage', 'facilitiesPage']
                    if (value === 'standardPage') return true
                    if (uniqueTypes.includes(value)) {
                      const payload = await getPayloadHMR({ config: configPromise })

                      const existingPage = await payload.find({
                        collection: 'pages',
                        where: {
                          'header.pagetype': {
                            equals: 'newsPage',
                          },
                        },
                      })

                      if (existingPage.totalDocs > 0 && value === 'newsPage') {
                        return `Ya existe una página de Noticias. Este tipo de página debe ser única.`
                      }
                      if (existingPage.totalDocs > 0 && value === 'indexPage') {
                        return `Ya existe una página de inicio. Este tipo de página debe ser única.`
                      }
                      if (existingPage.totalDocs > 0 && value === 'facilitiesPage') {
                        return `Ya existe una página de instalacciones deportivas. Este tipo de página debe ser única.`
                      }
                    }

                    return true
                  },
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
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: 'Titulo',
                  type: 'text',
                  required: true,
                  validate: (value: any, { data }: any) => {
                    if (data.header?.pagetype === 'standarPage') {
                      const forbiddenTitles = [
                        'noticias san esteban de gormaz',
                        'noticias-san-esteban-de-gormaz',
                        'instalaciones deportivas san esteban de gormaz',
                        'instalaciones-deportivas-san-esteban-de-gormaz',
                      ]
                      if (forbiddenTitles.includes(value.toLowerCase().trim())) {
                        return 'Este título está reservado y no puede ser utilizado.'
                      }
                    }
                    return true
                  },
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
                BookingsBlock,
                RichText,
                Faqs,
                StickyTextImages,
                StripeTPV,
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
      label: 'Url de la página - Generado automáticamente',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true, // Siempre será de solo lectura en la interfaz de administración
      },
      hooks: {
        beforeValidate: [
          (args) => {
            const { data, value } = args

            if (data?.header?.pagetype === 'indexPage') {
              return 'index'
            } else if (data?.header?.pagetype === 'newsPage') {
              return 'noticias-san-esteban-de-gormaz'
            } else if (data?.header?.pagetype === 'facilitiesPage') {
              return 'instalaciones-deportivas-san-esteban-de-gormaz'
            } else if (data?.header?.pagetype === 'standarPage') {
              // Usamos el hook formatSlug directamente aquí
              return formatSlug('header', 'title')(args)
            }
            // Si no se cumple ninguna condición, devolvemos el valor actual
            return value
          },
        ],
      },
    },
  ],
}

export default Pages
