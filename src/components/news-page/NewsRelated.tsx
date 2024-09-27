import React from 'react'
import Container from '../Container'
import Title from '../lib/title'
import { NewsRelatedProps } from '@/types/types'
import NRCard from './NRCard'

export default function NewsRelated({ newsRelated }: NewsRelatedProps) {
  return (
    <section className="overflow-hidden bg-[#f3f4f6] border-t border-border">
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
            <NRCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
      </Container>
    </section>
  )
}
