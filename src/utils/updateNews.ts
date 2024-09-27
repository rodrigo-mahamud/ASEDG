// hooks/updateNews.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { Payload } from 'payload'

const updateNews = async () => {
  const payload: Payload = await getPayloadHMR({ config: configPromise })

  try {
    // Obtener todas las noticias, ordenadas por fecha de publicación descendente
    const allNewsResponse = await payload.find({
      collection: 'news',
      sort: '-publishedDate',
      limit: 8, // Limitamos a 8 noticias
    })
    const allNews = allNewsResponse.docs as any[]

    // Buscar todas las páginas publicadas que contienen el campo 'header.newsFour'
    const pagesResponse = await payload.find({
      collection: 'pages',
      where: {
        and: [{ _status: { equals: 'published' } }, { 'header.newsFour': { exists: true } }],
      },
    })
    const pages = pagesResponse.docs as any[]

    // Actualizar cada página que tiene el campo 'header.newsFour'
    for (const page of pages) {
      try {
        const updatedNewsFour = allNews.map((news: any) => news.id)

        // Comparar si realmente hubo cambios antes de actualizar
        const newsFourChanged =
          JSON.stringify(updatedNewsFour) !== JSON.stringify(page.header.newsFour)

        if (newsFourChanged) {
          await payload.update({
            collection: 'pages',
            id: page.id,
            data: {
              header: {
                ...page.header,
                newsFour: updatedNewsFour,
              },
            },
          })
          console.log(`Página ${page.id}: campo 'header.newsFour' actualizado con éxito`)
        } else {
          console.log(`Página ${page.id}: No se requirieron actualizaciones para 'header.newsFour'`)
        }
      } catch (error) {
        console.error(`Error al procesar la página ${page.id}:`, error)
      }
    }

    console.log('Proceso de actualización de newsFour completado')
  } catch (error) {
    console.error('Error en el proceso de actualización de newsFour:', error)
  }
}

export default updateNews
