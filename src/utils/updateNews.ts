// hooks/updateNews.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Ajusta esta ruta según la ubicación de tu configuración de Payload
import type { Payload } from 'payload'

// ... (Mantén las interfaces y tipos existentes )

const updateNews = async () => {
  const payload: Payload = await getPayloadHMR({ config: configPromise })

  // Obtener todas las noticias
  const allNewsResponse = await payload.find({
    collection: 'news',
  })
  const allNews = allNewsResponse.docs as any

  // Obtener las noticias fijas (fixed)
  const fixedNewsResponse = await payload.find({
    collection: 'news',
    where: {
      fixed: { equals: true },
    },
  })
  const fixedNews = fixedNewsResponse.docs as any

  // Buscar todas las páginas que contienen los bloques 'newsblock', 'newsfeatured' o 'newspinged'
  const pagesResponse = await payload.find({
    collection: 'pages',
    where: {
      or: [
        {
          'body.layout.blockType': {
            in: ['newsblock', 'newspinged'],
          },
        },
        {
          'body.layout.tabs.content.blockType': {
            equals: 'newsfeatured',
          },
        },
      ],
    },
  })
  const pages = pagesResponse.docs as any

  // Actualizar cada página que contiene los bloques 'newsblock', 'newsfeatured' o 'newspinged'
  for (const page of pages) {
    let updated = false

    const updatedLayout = page.body.layout.map((block: any) => {
      if ((block as any).blockType === 'newsblock') {
        updated = true

        return {
          ...block,
          allNews: allNews.map((news: any) => news.id), // Asignar solo los IDs de las noticias
        } as any
      }
      if ((block as any).blockType === 'newspinged') {
        updated = true

        return {
          ...block,
          newspinged: fixedNews.map((news: any) => news.id), // Asignar los IDs de las noticias fijas
        } as any
      }
      if (block.tabs) {
        updated = true
        return {
          ...block,
          tabs: block.tabs.map((tab: any) => {
            return {
              ...tab,
              content: tab.content.map((contentBlock: any) => {
                if ((contentBlock as any).blockType === 'newsfeatured') {
                  return {
                    ...contentBlock,
                    newsFour: allNews.slice(0, 4).map((news: any) => news.id),
                  }
                }
                return contentBlock
              }),
            }
          }),
        }
      }
      return block
    })

    // Actualiza el campo `newsFour` en el header si existe
    const updatedHeader = page.header
      ? {
          ...page.header,
          newsFour: allNews.slice(0, 4).map((news: any) => news.id),
        }
      : page.header

    // Si se realizó alguna actualización, guardar la página
    if (updated) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          body: { layout: updatedLayout },
          ...(updatedHeader && { header: updatedHeader }),
        },
      })
    } else {
    }
  }
}

export default updateNews
