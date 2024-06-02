import React from 'react'
import { IconArrowNarrowRight, IconBellPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { Button } from '../../../../components/lib/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/lib/tooltip'
import useGoogleCalendarLink from '@/app/(payload)/hooks/useGoogleCalendarLink' // Asegúrate de ajustar la ruta según sea necesario
import dayjs from 'dayjs'

interface BusListProps {
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

const BusList: React.FC<BusListProps> = ({
  from,
  fromRoad,
  fromHour,
  to,
  toRoad,
  toHour,
  companyImg,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* const fromDateTime = dayjs()
          .hour(parseInt(fromHour.split(':')[0]))
          .minute(parseInt(fromHour.split(':')[1]))
        const start = fromDateTime.subtract(3, 'hour').toDate() // Una hora antes de la hora de inicio

        const googleCalendarLink = useGoogleCalendarLink({
          title: `Autobus desde ${from} a ${to}`,
          start: start,
          description: `Recuerda que tu autobus a ${to} sale en 30 min. ¡Buen viaje!`,
          location: from,
        }) */}

      <div className="flex w-full gap-8 border border-[#8c9fb2a2] rounded-md px-8 py-4 hover:-translate-y-2 transform transition duration-200 hover:shadow-lg hover:bg-slate-100">
        <div className="w-1/6 relative">
          <Image src={companyImg.url} className="object-contain" alt={companyImg.alt} fill />
        </div>
        <div className="w-5/6 relative flex justify-center gap-8 items-center">
          <div className="flex flex-col">
            <h4 className="font-bold text-lg">{fromHour}</h4>
            <h5>{from}</h5>
            <h5>{fromRoad}</h5>
          </div>
          <IconArrowNarrowRight className="w-24 h-24 stroke-[0.5] scale-y-75 scale-x-110" />
          <div className="flex flex-col">
            <h4 className="font-bold text-lg">{toHour}</h4>
            <h5>{to}</h5>
            <h5>{toRoad}</h5>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" className="p-0 border-secondary-foreground" asChild>
                {/* <a
                      className="w-full flex items-center justify-center p-3"
                      href={googleCalendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBellPlus className="w-5 h-5" />
                    </a> */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Añadir recordatorio</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default BusList
