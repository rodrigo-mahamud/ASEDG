// hooks/updateNews.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { Payload } from 'payload'

const updateNews = async () => {
  const payload: Payload = await getPayloadHMR({ config: configPromise })

  try {
    // Obtener todas las noticias
    const allNewsResponse = await payload.find({
      collection: 'news',
    })
    const allNews = allNewsResponse.docs as any[]

    // Obtener las noticias fijas (fixed)
    const fixedNewsResponse = await payload.find({
      collection: 'news',
      where: {
        fixed: { equals: true },
      },
    })
    const fixedNews = fixedNewsResponse.docs as any[]

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
    const pages = pagesResponse.docs as any[]

    // Actualizar cada página que contiene los bloques 'newsblock', 'newsfeatured' o 'newspinged'
    for (const page of pages) {
      try {
        // Verificar si la página aún existe
        const pageExists = await payload.findByID({
          collection: 'pages',
          id: page.id,
        })

        if (!pageExists) {
          console.log(`La página ${page.id} ya no existe, saltando...`)
          continue // Salta a la siguiente iteración del bucle
        }

        let updated = false
        const updatedLayout = page.body.layout.map((block: any) => {
          if (block.blockType === 'newsblock') {
            updated = true
            return {
              ...block,
              allNews: allNews.map((news: any) => news.id),
            }
          }
          if (block.blockType === 'newspinged') {
            updated = true
            return {
              ...block,
              newspinged: fixedNews.map((news: any) => news.id),
            }
          }
          if (block.tabs) {
            updated = true
            return {
              ...block,
              tabs: block.tabs.map((tab: any) => ({
                ...tab,
                content: tab.content.map((contentBlock: any) => {
                  if (contentBlock.blockType === 'newsfeatured') {
                    return {
                      ...contentBlock,
                      newsFour: allNews.slice(0, 4).map((news: any) => news.id),
                    }
                  }
                  return contentBlock
                }),
              })),
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
          console.log(`Página ${page.id} actualizada con éxito`)
        } else {
          console.log(`No se requirieron actualizaciones para la página ${page.id}`)
        }
      } catch (error) {
        console.error(`Error al procesar la página ${page.id}:`, error)
      }
    }

    console.log('Proceso de actualización de noticias completado')
  } catch (error) {
    console.error('Error en el proceso de actualización de noticias:', error)
  }
}

export default updateNews
