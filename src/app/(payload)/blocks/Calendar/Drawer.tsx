import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/lib/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/lib/drawer'
import { Button } from '@/components/lib/button'
import dayjs from 'dayjs'
import Image from 'next/image'
import {
  IconCalendarDue,
  IconClock,
  IconClockOff,
  IconMapPin,
  IconTablePlus,
} from '@tabler/icons-react'
import 'dayjs/locale/es'
import useGoogleCalendarLink from '@/app/(payload)/hooks/useGoogleCalendarLink' // Ajusta la ruta según sea necesario
import Link from 'next/link'

dayjs.locale('es')

interface CustomEvent {
  title: string
  start: Date
  end: Date
  description?: string
  img?: string
  location?: string
}

interface CalendarDrawerProps {
  selectedEvent: CustomEvent | null
  open: boolean
  setOpen: (open: boolean) => void
  isDesktop: boolean
}

const generateGoogleMapsLink = (location: string) => {
  const encodedLocation = encodeURIComponent(location)
  return `https://www.google.com/maps/dir//${encodedLocation}`
}

const formatEventDates = (start: Date, end: Date) => {
  const startDate = dayjs(start)
  const endDate = dayjs(end)

  if (startDate.isSame(endDate, 'day')) {
    return startDate.format('dddd D [de] MMMM')
  } else {
    return ` ${startDate.format('dddd D [de] MMMM')} - ${endDate.format('dddd D [de] MMMM')}`
  }
}

const CalendarDrawer: React.FC<CalendarDrawerProps> = ({
  selectedEvent,
  open,
  setOpen,
  isDesktop,
}) => {
  const eventDetails = selectedEvent
    ? selectedEvent
    : {
        title: '',
        start: new Date(),
        end: new Date(),
        description: '',
        location: '',
      }

  const googleCalendarLink = useGoogleCalendarLink({
    title: eventDetails.title,
    start: eventDetails.start,
    end: eventDetails.end,
    description: eventDetails.description,
    location: eventDetails.location,
  })

  if (!selectedEvent) return null
  return (
    <>
      {isDesktop && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="flex flex-col overflow-hidden h-[60vh] ">
            <div className="relative h-3/5">
              <Image
                src="/placeholder2.jpg"
                alt="go"
                quality={15}
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="m-8 h-2/5 flex flex-col justify-between min-h-64">
              <DialogHeader>
                <DialogTitle className="line-clamp-1">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="line-clamp-2">
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>
              <ul className="text-sm text-muted-foreground">
                {selectedEvent.location && (
                  <li className="flex mb-1 items-center">
                    <IconMapPin className="w-4 h-4 mr-1 stroke-2"></IconMapPin>
                    <a
                      className="line-clamp-1 font-semibold underline "
                      href={generateGoogleMapsLink(selectedEvent.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedEvent.location}
                    </a>
                  </li>
                )}
                <li className="flex mb-1 items-center ">
                  <IconCalendarDue className="w-4 h-4 mr-1 "></IconCalendarDue>{' '}
                  {formatEventDates(selectedEvent.start, selectedEvent.end)}
                </li>
                <li className="flex mb-1 items-center">
                  <IconClock className="w-4 h-4 mr-1"></IconClock> Inicio:{' '}
                  {dayjs(selectedEvent.start).format('HH:mm')}
                </li>
                <li className="flex mb-1 items-center">
                  <IconClockOff className="w-4 h-4 mr-1"></IconClockOff> Fin:{' '}
                  {dayjs(selectedEvent.end).format('HH:mm')}
                </li>
              </ul>
              <Button variant="shine" className="flex gap-1 hover:bg-secondaryAlt/75 w-5/6" asChild>
                <Link
                  href={googleCalendarLink}
                  className="w-full flex gap-1 hover:bg-secondaryAlt/75 h-fit py-3"
                >
                  <IconTablePlus className="w-4 h-4 mr-1"></IconTablePlus>
                  Añadir a mi calendario
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {!isDesktop && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{selectedEvent.title}</DrawerTitle>
              <DrawerDescription>{selectedEvent.description}</DrawerDescription>
              <ul className="text-sm">
                {selectedEvent.location && (
                  <li className="flex items-center">
                    <IconMapPin className="w-4 h-4 mr-1"></IconMapPin>
                    <a
                      className="line-clamp-1"
                      href={generateGoogleMapsLink(selectedEvent.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedEvent.location}
                    </a>
                  </li>
                )}
                <li className="flex items-center">
                  <IconClock className="w-4 h-4 mr-1"></IconClock> Inicio:{' '}
                  {dayjs(selectedEvent.start).format('HH:mm')}
                </li>
                <li className="flex items-center">
                  <IconClockOff className="w-4 h-4 mr-1"></IconClockOff> Fin:{' '}
                  {dayjs(selectedEvent.end).format('HH:mm')}
                </li>
                <li>{formatEventDates(selectedEvent.start, selectedEvent.end)}</li>
              </ul>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <Button variant="shine" className="flex gap-1 hover:bg-secondaryAlt/75 w-5/6" asChild>
                <a
                  className="w-full flex items-center"
                  href={googleCalendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconTablePlus className="w-4 h-4 mr-1"></IconTablePlus>
                  Añadir evento
                </a>
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export default CalendarDrawer
