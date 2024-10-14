import RichTextParser from '@/utils/richTextParser'
import { IconMapPinExclamation } from '@tabler/icons-react'
import React from 'react'

export default function FacilitieInfo({ data }) {
  return (
    <section className="w-[65%]">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold line-clamp-1 mb-2">{data.title}</h1>
        <h2 className="my-2 text-base">{data.description}</h2>
      </div>
      <RichTextParser content={data.richtxtcontent}></RichTextParser>
    </section>
  )
}
