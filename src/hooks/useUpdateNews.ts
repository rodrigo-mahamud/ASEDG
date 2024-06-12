import { CollectionAfterChangeHook } from 'payload/types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const useUpdateNews: CollectionAfterChangeHook = async ({ doc, req }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  console.log('Ejecutando useUpdateNews Hook')
  console.log('Documento de noticia:', doc)

  const pages = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.blockType': {
        equals: 'newslist',
      },
    },
  })

  console.log('Páginas encontradas:', pages.docs)

  for (const page of pages.docs) {
    const updatedLayout = page.body.layout.map((block: any) => {
      if (block.blockType === 'newslist') {
        let updatedNewsList = (block.newsRelationship || []).map((news: any) =>
          typeof news === 'string' ? news : news.id,
        )

        if (!updatedNewsList.includes(doc.id)) {
          updatedNewsList = [doc.id, ...updatedNewsList]
        }

        if (block.newsLimit !== 'all') {
          const limit = parseInt(block.newsLimit, 10)
          updatedNewsList = updatedNewsList.slice(0, limit)
        }

        console.log('Actualizando bloque newslist con:', updatedNewsList)

        return {
          ...block,
          newsRelationship: updatedNewsList,
        }
      }
      return block
    })

    console.log('Layout actualizado:', updatedLayout)

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        body: {
          layout: updatedLayout,
        },
      },
    })

    console.log('Página actualizada:', page.id)
  }
}

export default useUpdateNews
