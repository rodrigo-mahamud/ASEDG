import { FieldHook } from 'payload/types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const addAllNewsToRelationship: FieldHook = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const allNews = await payload.find({
    collection: 'news',
    limit: 0, // Obtener todas las noticias
  })
  console.log(allNews)
  // Retornar todos los IDs de noticias para el campo de relación
  return allNews.docs.map((news: { id: string }) => news.id)
}

export default addAllNewsToRelationship
