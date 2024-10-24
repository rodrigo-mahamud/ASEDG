import React from 'react'
import Container from '../../Container'
import Title from '../../ui/title'
import { NewsRelatedProps } from '@/types/types'
import NRCard from './NRCard'

export default function NewsRelated({ newsRelated }: NewsRelatedProps) {
  return (
    <section className="overflow-hidden bg-secondary border-t border-border">
      <Container className="py-32">
        <div className="flex justify-between w-full">
          <Title
            title={'Más información'}
            subtitle={
              'Recopilación de otras noticias sobre la localidad y su comarca que te pueden interesar'
            }
          />
        </div>
        <div className="flex gap-8">
          {newsRelated.map((newsItem) => (
            <NRCard key={newsItem.id} data={newsItem} />
          ))}
        </div>
      </Container>
    </section>
  )
}
