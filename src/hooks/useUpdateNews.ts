import { CollectionAfterChangeHook } from 'payload/types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const useUpdateNews: CollectionAfterChangeHook = async ({ doc, req }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  console.log('Ejecutando useUpdateNews Hook')
  console.log('Documento de noticia:', doc)

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
        const updatedNewsList = (block.newsRelationship || []).map((news: any) =>
          typeof news === 'string' ? news : news.id,
        )

        // Agrega solo el ID de la nueva noticia a la relación si no está ya presente
        if (!updatedNewsList.includes(doc.id)) {
          updatedNewsList.push(doc.id)
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
