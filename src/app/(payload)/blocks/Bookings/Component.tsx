import Container from '@/components/Container'
import ReservationsCard from './ReservationsCard'
import React from 'react'
import Title from '@/components/lib/title'

export default function BookingsBlock() {
  return (
    <Container>
      <Title
        title="Reservas no se XD"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. "
      ></Title>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
        <ReservationsCard />
        <ReservationsCard />
        <ReservationsCard />
        <ReservationsCard />
        <ReservationsCard />
      </div>
    </Container>
  )
}
