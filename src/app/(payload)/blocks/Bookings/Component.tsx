import Container from '@/components/Container'
import ReservationsCard from './BookingsCard'
import React from 'react'
import Title from '@/components/lib/title'
import BookingsCard from './BookingsCard'

export default function BookingsBlock() {
  return (
    <Container>
      <Title
        title="Reservas del gimnasio"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. "
      ></Title>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
        <BookingsCard></BookingsCard>
        <BookingsCard></BookingsCard>
        <BookingsCard></BookingsCard>
        <BookingsCard></BookingsCard>
      </div>
    </Container>
  )
}
