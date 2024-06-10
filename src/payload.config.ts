// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { CollectionConfig, GlobalConfig } from 'payload/types'
import Categorias from './app/(payload)/collections/Categorias'
import News from './app/(payload)/collections/News'
import Media from './app/(payload)/collections/Media'
import Pages from './app/(payload)/collections/Pages'
import Users from './app/(payload)/collections/Users'

import Settings from './app/(payload)/globals/Settings'
import Header from './app/(payload)/globals/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const groupCollections = (groupMappings: {
  [key: string]: CollectionConfig[]
}): CollectionConfig[] => {
  return Object.entries(groupMappings).flatMap(([group, collections]) =>
    collections.map((collection) => ({
      ...collection,
      admin: {
        ...collection.admin,
        group,
      },
    })),
  )
}

const groupGlobals = (groupMappings: { [key: string]: GlobalConfig[] }): GlobalConfig[] => {
  return Object.entries(groupMappings).flatMap(([group, globals]) =>
    globals.map((global) => ({
      ...global,
      admin: {
        ...global.admin,
        group,
      },
    })),
  )
}

const CategoriesCollections = [Categorias]
const MediaPagesCollections = [Pages, News, Media, Users]

const ConfigGlobals = [Settings, Header]

export default buildConfig({
  collections: [
    ...groupCollections({
      Contenido: MediaPagesCollections,
      Categorías: CategoriesCollections,
    }),
  ],
  globals: [
    ...groupGlobals({
      'Ajustes Globales': ConfigGlobals,
    }),
  ],
  admin: {
    user: Users.slug,
  },
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
