import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config' // Asegúrate de que esta ruta sea correcta

const payload = await getPayloadHMR({ config: configPromise })

const validateNews = async ({ data, operation }) => {
  if (operation === 'create' || (operation === 'update' && data.fixed === true)) {
    // Buscar todas las noticias con `fixed` igual a `true`
    const { docs: fixedNews } = await payload.find({
      collection: 'news',
      where: {
        fixed: {
          equals: true,
        },
      },
    })

    // Si ya hay 8 noticias fijadas, lanzar una advertencia
    if (fixedNews.length >= 8) {
      throw new Error('No puedes añadir más de 8 noticias fijadas.')
    }
  }
}

export default validateNews
