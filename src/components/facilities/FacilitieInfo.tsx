import RichTextParser from '@/utils/richTextParser'
import { IconMapPinExclamation } from '@tabler/icons-react'
import React from 'react'
import { FacilitiesRelated } from './FacilitiesRelated'
import { Separator } from '../ui/separator'
import BookingSticky from '../BookingSticky'
import DownloadTerms from '../DownloadTerms'
import { Button } from '../ui/button'

export default function FacilitieInfo({ data }: any) {
  return (
    <section className="w-full flex flex-col md:flex-row gap-24 relative md:pt-12">
      <div className="md:w-[65%]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold line-clamp-1 mb-2 tracking-tight">{data.title}</h1>
          <h2 className="my-2 text-base">{data.description}</h2>
        </div>
        <RichTextParser content={data.richtxtcontent}></RichTextParser>
        {data.facilitiesRelated && (
          <>
            <div className="md:py-14 py-7">
              <Separator></Separator>
            </div>
            <FacilitiesRelated data={data.facilitiesRelated}></FacilitiesRelated>
          </>
        )}
      </div>
      <div className="w-full md:w-[35%] hidden md:block sticky top-28 h-fit">
        <BookingSticky data={data.bookingOptions}></BookingSticky>
        <DownloadTerms
          className="mt-10 mb-2 group p-5 border border-border rounded-lg flex items-center"
          termsFile={data.termsFile}
          target="_blank"
        >
          <div className="flex flex-col w-11/12 items-start">
            <h2 className="text-base font-semibold mb-1">Términos y condiciones</h2>
            <h3 className="text-sm line-clamp-2 text-pretty text-muted-foreground text-start">
              Recuerda echar un vistazo a los terminos y condiciones
            </h3>
          </div>
          <div className="w-1/12 flex justify-center items-center">
            <Button
              variant="arrow"
              iconClass="w-3 h-3"
              className="text-foreground bg-border/35 w-10 h-10"
            ></Button>
          </div>
        </DownloadTerms>
      </div>
    </section>
  )
}
