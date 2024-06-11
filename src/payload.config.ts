import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Pages, Media, News, Categorias],
  globals: [Settings, Header],
  editor: lexicalEditor(),
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
