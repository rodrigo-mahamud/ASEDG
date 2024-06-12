import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const updateNewsLists = async (docId: string, addNews: boolean) => {
  const payload = await getPayloadHMR({ config: configPromise })

  console.log('Ejecutando updateNewsLists Hook')

  // Obtén las páginas que contienen el bloque `newslist`
  const pages = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.blockType': {
        equals: 'newslist',
      },
    },
  })

  console.log('Páginas encontradas:', pages.docs)

  // Itera sobre las páginas encontradas y actualiza el bloque `newslist`
  for (const page of pages.docs) {
    const updatedLayout = page.body.layout.map((block: any) => {
      if (block.blockType === 'newslist') {
        // Limpia cualquier objeto de noticia existente en `newsRelationship`
        let updatedNewsList = (block.newsRelationship || []).map((news: any) =>
          typeof news === 'string' ? news : news.id,
        )

        if (addNews) {
          // Agrega solo el ID de la nueva noticia al inicio de la relación si no está ya presente
          if (!updatedNewsList.includes(docId)) {
            updatedNewsList = [docId, ...updatedNewsList]
          }

          // Limita el número de noticias a mostrar basado en `newsLimit`
          if (block.newsLimit !== 'all') {
            const limit = parseInt(block.newsLimit, 10)
            updatedNewsList = updatedNewsList.slice(0, limit)
          }
        } else {
          // Elimina el ID de la noticia de la relación
          updatedNewsList = updatedNewsList.filter((id) => id !== docId)
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

const afterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await updateNewsLists(doc.id, true)
}

const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await updateNewsLists(doc.id, false)
}

export { afterChange, afterDelete }
