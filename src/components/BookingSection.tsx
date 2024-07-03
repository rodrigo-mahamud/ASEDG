import React from 'react'
import Container from './Container'
import BookingSticky from './BookingSticky'
import BookingInfo from './BookingInfo'

export default function BookingSection({ data }: any) {
  return (
    <Container className="pt-8">
      <div className="w-full flex gap-9 relative">
        <BookingInfo></BookingInfo>
        <BookingSticky data={data.bookingData}></BookingSticky>
      </div>
    </Container>
  )
}
