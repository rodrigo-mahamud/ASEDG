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
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Categorias from './app/(payload)/collections/Categorias'
import News from './app/(payload)/collections/News'
import Media from './app/(payload)/collections/Media'
import Pages from './app/(payload)/collections/Pages'
import Users from './app/(payload)/collections/Users'

import Settings from './app/(payload)/globals/Settings'
import Header from './app/(payload)/globals/Header'
import TextImagesBlock from './app/(payload)/blocks/TextImages'
import Bookings from './app/(payload)/collections/Bookings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Pages, Media, News, Bookings, Categorias],
  globals: [Settings, Header],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      AlignFeature(),
      HeadingFeature(),
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
            // Example showing how to customize the built-in fields
            // of the Upload feature
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
