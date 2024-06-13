import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const updateNewsFeatured = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      'body.layout.tabs.content.blockType': { equals: 'newsfeatured' },
    },
  })

  if (pages.docs.length > 0) {
    const news = await payload.find({
      collection: 'news',
      limit: 4, // Obtén las 4 noticias más recientes
      sort: '-createdAt',
    })

    const newsIds = news.docs.map((newsItem) => newsItem.id)

    const page = pages.docs[0]

    // Encuentra el bloque `newsfeatured` dentro del contenido de la página
    const updatedContent = page.body.layout.map((layout) => {
      return {
        ...layout,
        tabs: layout.tabs.map((tab) => {
          return {
            ...tab,
            content: tab.content.map((block) => {
              if (block.blockType === 'newsfeatured') {
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
    })

    const updatedPage = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        body: {
          layout: updatedContent,
        },
      },
    })

    console.log('Page updated with new featured news:', updatedPage)
  } else {
    console.log('No page with newsfeatured block found')
  }
}

export default updateNewsFeatured
