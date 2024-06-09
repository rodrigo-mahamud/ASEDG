import { postgresAdapter } from '@payloadcms/db-postgres'
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import {
  BlocksFeature,
  FixedToolbarFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'
// import seoPlugin from '@payloadcms/plugin-seo'
import { Users } from './app/(payload)/collections/Users'
import { Pages } from './app/(payload)/collections/Pages'
import Settings from './app/(payload)/globals/Settings'
import { Header } from './app/(payload)/globals/Header'
import Media from './app/(payload)/collections/Media'
import { News } from './app/(payload)/collections/News'
import Categorias from './app/(payload)/collections/Categorias'
import TextImagesBlock from './app/(payload)/blocks/TextImages'
import CallToAction from './app/(payload)/blocks/CallToAction'
import link from './app/(payload)/fields/link'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Pages, Media, News, Categorias],
  //plugins: [
  //   seoPlugin({
  //     collections: ['pages'],
  //     uploadsCollection: 'media',
  //     generateTitle: ({ doc }) => `Website.com — ${doc.title.value}`,
  //     generateDescription: ({ doc }) => doc.excerpt,
  //   }),
  //],
  globals: [Settings, Header],
  editor: lexicalEditor({
    // features: ({ defaultFeatures }) => [
    //   ...defaultFeatures,
    //   FixedToolbarFeature(),
    //   LinkFeature({
    //     // Example showing how to customize the built-in fields
    //     // of the Link feature
    //     fields: [
    //       link,
    //       {
    //         name: 'rel',
    //         label: 'Rel Attribute',
    //         type: 'select',
    //         hasMany: true,
    //         options: ['noopener', 'noreferrer', 'nofollow'],
    //         admin: {
    //           description:
    //             'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
    //         },
    //       },
    //     ],
    //   }),
    //   UploadFeature({
    //     collections: {
    //       uploads: {
    //         // Example showing how to customize the built-in fields
    //         // of the Upload feature
    //         fields: [
    //           {
    //             name: 'caption',
    //             type: 'richText',
    //             editor: lexicalEditor(),
    //           },
    //         ],
    //       },
    //     },
    //   }),
    //   // This is incredibly powerful. You can re-use your Payload blocks
    //   // directly in the Lexical editor as follows:
    //   BlocksFeature({
    //     blocks: [TextImagesBlock, CallToAction],
    //   }),
    // ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable

  // sharp,
})
