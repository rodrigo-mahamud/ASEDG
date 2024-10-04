import React from 'react'
import Container from './Container'
import BookingSticky from './BookingSticky'
import BookingInfo from './BookingInfo'

export default function BookingSection({ data }: any) {
  return (
    <div className="w-full flex gap-9 relative mt-8">
      <BookingInfo></BookingInfo>
      <BookingSticky data={data.bookingOptions}></BookingSticky>
    </div>
  )
}
