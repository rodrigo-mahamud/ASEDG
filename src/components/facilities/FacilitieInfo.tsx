import RichTextParser from '@/utils/richTextParser'
import { IconMapPinExclamation } from '@tabler/icons-react'
import React from 'react'
import { FacilitiesRelated } from './FacilitiesRelated'
import { Separator } from '../lib/separator'
import BookingSticky from '../BookingSticky'

export default function FacilitieInfo({ data }) {
  return (
    <section className="w-full flex gap-24 relative pt-12">
      <div className="w-[65%]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold line-clamp-1 mb-2">{data.title}</h1>
          <h2 className="my-2 text-base">{data.description}</h2>
        </div>
        <RichTextParser content={data.richtxtcontent}></RichTextParser>
        <FacilitiesRelated data={data.facilitiesRelated}></FacilitiesRelated>
      </div>
      <BookingSticky
        className="w-[35%] sticky top-28 h-fit"
        data={data.bookingOptions}
        termsFile={data.termsFile}
      ></BookingSticky>
    </section>
  )
}
