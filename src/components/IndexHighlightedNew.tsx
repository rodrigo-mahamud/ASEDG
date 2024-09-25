'use client'
import { cn } from '@/utils/utils'
import Marquee from '@/components/lib/marquee'
import NRCard from './NewsPage/NRCard'
import { Category, Image, MasonryImages, NewsItemBase } from '@/types/typesNP'

const placeholderImage: Image = {
  url: '/placeholder.jpg',
  alt: 'Imagen de placeholder',
  width: 400,
  height: 300,
}

const placeholderCategory: Category = {
  id: '1',
  title: 'Categoría de prueba',
}

const placeholderMasonryImages: MasonryImages = {
  masonryImage1: placeholderImage,
  masonryImage2: placeholderImage,
  masonryImage3: placeholderImage,
  masonryImage4: placeholderImage,
  masonryImage5: placeholderImage,
}

export const reviews: NewsItemBase[] = [
  {
    id: '1',
    slug: 'nuevo-parque-inaugurado',
    title: 'Nuevo parque inaugurado en San Esteban de Gormaz',
    summary: 'El ayuntamiento inaugura un nuevo espacio verde para el disfrute de los vecinos',
    videoUrl: '',
    image: placeholderImage,
    masonryImages: placeholderMasonryImages,
    publishedDate: '2024-09-15T10:00:00Z',
    categories: [placeholderCategory],
    shareClass: 'share-button',
  },
  {
    id: '2',
    slug: 'festival-vino-exito',
    title: 'Festival de vino atrae a miles de visitantes',
    summary: 'El festival anual de vino de la comarca bate récords de asistencia',
    videoUrl: 'https://example.com/video-festival-vino.mp4',
    image: placeholderImage,
    publishedDate: '2024-09-10T14:30:00Z',
    categories: [placeholderCategory],
    shareClass: 'share-button-alt',
  },
  {
    id: '3',
    slug: 'restauracion-castillo-finalizada',
    title: 'Restauración del castillo medieval finalizada',
    summary: 'Tras dos años de trabajos, el castillo vuelve a abrir sus puertas al público',
    videoUrl: '',
    image: placeholderImage,
    masonryImages: placeholderMasonryImages,
    publishedDate: '2024-09-05T09:15:00Z',
    categories: [placeholderCategory],
  },
  {
    id: '4',
    slug: 'nueva-ruta-senderismo',
    title: 'Nueva ruta de senderismo inaugurada en la comarca',
    summary: 'Se inaugura una ruta que recorre los puntos más pintorescos de la zona',
    videoUrl: '',
    image: placeholderImage,
    publishedDate: '2024-08-28T11:45:00Z',
    categories: [placeholderCategory],
    shareClass: 'share-button',
  },
]
const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

export function IndexHighlightedNew() {
  return (
    <div className="maskNewsIndex flex w-full flex-row items-center justify-center border-0 bg-transparent h-screen">
      <Marquee pauseOnHover vertical repeat={4} className="[--duration:30s]">
        {firstRow.map((newsItem) => (
          <NRCard className="w-full" newsItem={newsItem}></NRCard>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover repeat={4} vertical className="[--duration:30s]">
        {secondRow.map((newsItem) => (
          <NRCard className="w-full" newsItem={newsItem}></NRCard>
        ))}
      </Marquee>
    </div>
  )
}
