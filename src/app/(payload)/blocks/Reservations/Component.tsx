import Container from '@/components/Container'
import ReservationsCard from './ReservationsCard'
import React from 'react'

export default function ReservationsBlock() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
        <ReservationsCard />
      </div>
    </Container>
  )
}
