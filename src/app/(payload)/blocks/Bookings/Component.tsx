import Container from '@/components/Container'
import ReservationsCard from './FacilitieCard'
import React from 'react'
import Title from '@/components/lib/title'
import BookingsCard from './FacilitieCard'
import FacilitieCard from './FacilitieCard'

export default function BookingsBlock({ title, subtitle, allFacilities }: any) {
  console.log(allFacilities)

  return (
    <Container>
      <Title title={title} subtitle={subtitle}></Title>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
        {allFacilities.map((facilitie, index) => (
          <FacilitieCard key={index} data={facilitie}></FacilitieCard>
        ))}
      </div>
    </Container>
  )
}
