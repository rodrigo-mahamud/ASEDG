import { IconArrowNarrowRight, IconBellPlus, IconTablePlus } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../../../../components/lib/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/lib/tooltip'
import useGoogleCalendarLink from '@/app/(payload)/hooks/useGoogleCalendarLink' // Asegúrate de ajustar la ruta según sea necesario
import dayjs from 'dayjs'

interface BusItemTypes {
  data: {
    from: string
    fromRoad: string
    fromHour: string
    to: string
    toRoad: string
    toHour: string
    companyImg: {
      url: string
      alt: string
    }
  }
}

export default function BusItem({ data }: BusItemTypes) {
  const fromDateTime = dayjs()
    .hour(parseInt(data.fromHour.split(':')[0]))
    .minute(parseInt(data.fromHour.split(':')[1]))
  const start = fromDateTime.subtract(3, 'hour').toDate() // Una hora antes de la hora de inicio

  const googleCalendarLink = useGoogleCalendarLink({
    title: `Autobus desde ${data.from} a ${data.to}`,
    start: start,
    description: `Recuerda que tu autobus a ${data.to} sale en 30 min. ¡Buen viaje!`,
    location: data.from,
  })
  return (
    <div className="flex w-full gap-8 border border-[#8c9fb2a2] rounded-md px-8 py-4 hover:-translate-y-2 transform transition duration-200 hover:shadow-lg hover:bg-slate-100">
      <div className="w-1/6 relative">
        <Image
          src={data.companyImg.url}
          className="object-contain"
          alt={data.companyImg.alt}
          fill
        ></Image>
      </div>
      <div className="w-5/6 relative flex justify-center gap-8 items-center">
        <div className="flex flex-col">
          <h4 className="font-bold text-lg">{data.fromHour}</h4>
          <h5>{data.from}</h5>
          <h5>{data.fromRoad}</h5>
        </div>
        <IconArrowNarrowRight className="w-24 h-24 stroke-[0.5] scale-y-75 scale-x-110"></IconArrowNarrowRight>
        <div className="flex flex-col">
          <h4 className="font-bold text-lg">{data.toHour}</h4>
          <h5>{data.to}</h5>
          <h5>{data.toRoad}</h5>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" className="p-0 border-secondary-foreground" asChild>
              <a
                className="w-full flex items-center justify-center p-3"
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBellPlus className="w-5 h-5"></IconBellPlus>
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Añadir recordatorio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
