import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import Categorias from './app/(payload)/collections/Categorias'
import News from './app/(payload)/collections/News'
import Media from './app/(payload)/collections/Media'
import Pages from './app/(payload)/collections/Pages'
import Users from './app/(payload)/collections/Users'

import Settings from './app/(payload)/globals/Settings'
import Header from './app/(payload)/globals/Header'
import TextImagesBlock from './app/(payload)/blocks/TextImages'
import Facilities from './app/(payload)/collections/Facilities'
import Sports from './app/(payload)/collections/Sports'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Users, Pages, Media, News, Facilities, Sports, Categorias],
  globals: [Settings, Header],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  admin: {
    livePreview: {
      url: `http://${process.env.ROOT_DOMAIN}`,
      collections: ['pages'],
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      AlignFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      FixedToolbarFeature(),
      HorizontalRuleFeature(),
      LinkFeature({
        // Example showing how to customize the built-in fields
        // of the Link feature
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
        blocks: [TextImagesBlock],
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
    // storage-adapter-placeholder
  ],
})
