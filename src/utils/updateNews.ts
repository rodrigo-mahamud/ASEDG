// hooks/updateNews.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Ajusta esta ruta según la ubicación de tu configuración de Payload
import type { Payload } from 'payload'

interface News {
  id: string
  title: string
  content: string
  // Añade más campos según sea necesario
}

interface NewsBlock {
  blockType: 'newsblock'
  allNews: string[]
  // Otros campos según sea necesario
}

type LayoutBlock = NewsBlock | Record<string, unknown>

interface Page {
  id: string
  body: {
    layout: LayoutBlock[]
  }
  // Añade más campos según sea necesario
}

const updateNews = async () => {
  const payload: Payload = await getPayloadHMR({ config: configPromise })

  // Obtener todas las noticias
  const allNewsResponse = await payload.find({
    collection: 'news',
  })
  const allNews = allNewsResponse.docs as any

  // Buscar todas las páginas que contienen los bloques 'newsblock'
  const pagesResponse = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.blockType': {
        equals: 'newsblock',
      },
    },
  })
  const pages = pagesResponse.docs as any

  console.log('Pages found:', pages.length)

  // Actualizar cada página que contiene los bloques 'newsblock'
  for (const page of pages) {
    let updated = false

    const updatedLayout = page.body.layout.map((block: any) => {
      console.log('Checking block:', (block as any).blockType)
      if ((block as any).blockType === 'newsblock') {
        updated = true
        console.log('Updating newsblock:', block)
        return {
          ...block,
          allNews: allNews.map((news: any) => news.id), // Asignar solo los IDs de las noticias
        } as NewsBlock
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
