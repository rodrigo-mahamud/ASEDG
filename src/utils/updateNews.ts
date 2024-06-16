// hooks/updateNewsFeatured.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Ajusta esta ruta según la ubicación de tu configuración de Payload

const updateNewsFeatured = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const pagesResponse = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.tabs.content.blockType': { equals: 'newsfeatured' },
    },
  })

  const pages = pagesResponse.docs as any

  if (pages.length > 0) {
    const newsResponse = await payload.find({
      collection: 'news',
      limit: 4, // Obtén las 4 noticias más recientes
      sort: '-createdAt',
    })

    const news = newsResponse.docs as any
    const newsIds = news.map((newsItem: any) => newsItem.id)

    const page = pages[0]

    // Actualiza los bloques `newsfeatured` dentro del contenido de la página
    const updatedContent = page.body.layout.map((layout: any) => {
      if (layout.tabs) {
        return {
          ...layout,
          tabs: layout.tabs.map((tab: any) => {
            return {
              ...tab,
              content: tab.content.map((block: any) => {
                if ((block as any).blockType === 'newsfeatured') {
                  return {
                    ...block,
                    newsFour: newsIds,
                  }
                }
                return block
              }),
            }
          }),
        }
      }

      return layout
    })

    // Actualiza el campo `newsFour` en el header
    const updatedHeader = {
      ...page.header,
      newsFour: newsIds,
    }

    const updatedPage = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        body: {
          layout: updatedContent,
        },
        header: updatedHeader,
      },
    })

    console.log('Page updated with new featured news:', updatedPage)
  } else {
    console.log('No page with newsfeatured block found')
  }
}

export default updateNewsFeatured
