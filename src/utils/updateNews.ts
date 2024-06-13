// hooks/updateNews.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Ajusta esta ruta según la ubicación de tu configuración de Payload

const updateNews = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  // Obtener todas las noticias
  const allNews = await payload.find({ collection: 'news' })

  // Buscar todas las páginas que contienen los bloques 'newsblock'
  const pages = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.blockType': 'newsblock',
    },
  })

  console.log('Pages found:', pages.docs.length)

  // Actualizar cada página que contiene los bloques 'newsblock'
  for (const page of pages.docs) {
    let updated = false

    const updatedLayout = page.body.layout.map((block) => {
      console.log('Checking block:', block.blockType)
      if (block.blockType === 'newsblock') {
        updated = true
        console.log('Updating newsblock:', block)
        return {
          ...block,
          allNews: allNews.docs.map((news) => news.id), // Asignar solo los IDs de las noticias
        }
      }
      return block
    })

    // Si se realizó alguna actualización, guardar la página
    if (updated) {
      console.log('Updating page:', page.id)
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { body: { layout: updatedLayout } },
      })
    } else {
      console.log('No updates for page:', page.id)
    }
  }
}

export default updateNews
