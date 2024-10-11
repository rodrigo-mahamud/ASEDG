import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HTMLConverterFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { seoPlugin } from '@payloadcms/plugin-seo'
import Categorias from './app/(payload)/collections/Categorias'
import News from './app/(payload)/collections/News'
import Media from './app/(payload)/collections/Media'
import Pages from './app/(payload)/collections/Pages'
import Users from './app/(payload)/collections/Users'
import Payments from './app/(payload)/collections/Payments'
import Settings from './app/(payload)/globals/Settings'
import Header from './app/(payload)/globals/Header'
import Facilities from './app/(payload)/collections/Facilities'
import Sports from './app/(payload)/collections/Sports'
import IconList from './app/(payload)/blocks/RTBlocks/IconList'
import LinkButton from './app/(payload)/blocks/RTBlocks/LinkButton'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Users, Pages, Media, News, Facilities, Sports, Categorias, Payments],
  globals: [Settings, Header],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  admin: {
    livePreview: {
      url: ({ collectionConfig, data }) => {
        const baseURL = `http://${process.env.ROOT_DOMAIN}`
        switch (collectionConfig?.slug) {
          case 'pages':
            return `${baseURL}/preview/pages/${data.id}`
          case 'news':
            return `${baseURL}/preview/news/${data.id}`
          default:
            return `${baseURL}/preview/pages/${data.id}`
        }
      },
      breakpoints: [
        {
          label: 'Movil',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Escritorio',
          name: 'desktop',
          width: 875,
          height: 460,
        },
      ],
      collections: ['pages', 'news'],
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,

      AlignFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h2', 'h3', 'h4'],
      }),
      FixedToolbarFeature(),
      HorizontalRuleFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature({
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
            admin: {
              description:
                'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
            },
          },
        ],
      }),
      UploadFeature({
        collections: {
          uploads: {
            fields: [
              {
                name: 'caption',
                type: 'richText',
                editor: lexicalEditor(),
              },
            ],
          },
        },
      }),
      BlocksFeature({
        blocks: [IconList, LinkButton],
      }),
    ],
  }),

  secret: process.env.PAYLOAD_SECRET || '',
  email: nodemailerAdapter({
    defaultFromAddress: 'contacto@rodrigomahamud.com',
    defaultFromName: 'Ayuntamiento de San Esteban de Gormaz',
    transportOptions: {
      host: process.env.SECRET_SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SECRET_SMTP_MAIL,
        pass: process.env.SECRET_SMTP_PASSWORD,
      },
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'news'],
      uploadsCollection: 'media',
      generateTitle: ({ doc, collectionSlug }) => {
        switch (collectionSlug) {
          case 'pages':
            return doc.header.title
          case 'news':
            return doc.title
          default:
            return doc.header.title
        }
      },
      generateDescription: ({ doc, collectionSlug }) => {
        switch (collectionSlug) {
          case 'pages':
            return doc.header.description
          case 'news':
            return doc.summary
          default:
            return doc.header.description
        }
      },

      generateURL: ({ doc, collectionSlug }) => {
        const baseURL = `https://${process.env.ROOT_DOMAIN}`
        switch (collectionSlug) {
          case 'pages':
            return `${baseURL}/${doc.slug}`
          case 'news':
            return `${baseURL}/noticias-san-esteban-de-gormaz/${doc.slug}`
          default:
            return `${baseURL}/${doc.slug}`
        }
      },
    }),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
      rest: true, // Habilita el endpoint REST de Stripe
    }),
  ],
})
