'use client'
import React, { useState, useEffect } from 'react'
import { Calendar, dayjsLocalizer, ToolbarProps } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/app/(frontend)/styles/calendar.css'
import { Button } from '@/components/lib/button'
import { useMediaQuery } from '@/app/(payload)/hooks/useMediaQuery'
import CalendarDrawer from '../Calendar/Drawer' // Ajusta la ruta según sea necesario

dayjs.locale('es')

const locales = {
  es: require('dayjs/locale/es'),
}
const localizer = dayjsLocalizer(dayjs)

interface CustomEventComponentProps {
  event: CustomEvent
}
interface CustomEvent {
  title: string
  start: Date
  end: Date
  color?: string
  description?: string
  img?: string
  location?: string
}

const colors = ['#635bff']

const CalendarBlock: React.FC<any> = ({ events }) => {
  const mappedEvents = events.map((event: any, index: number) => ({
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    description: event.description,
    location: event.location,
    img: event.img,
    color: colors[index % colors.length],
  }))

  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleNavigate = (date: Date) => {
    setCurrentDate(date)
  }

  const eventStyleGetter = (event: CustomEvent) => {
    const backgroundColor = event.color
    return {
      style: {
        backgroundColor,
        '--event-color': backgroundColor,
      },
    }
  }

  const handleSelectEvent = (event: CustomEvent) => {
    setSelectedEvent(event)
    setOpen(true)
  }

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        className="h-full"
        date={currentDate}
        onNavigate={handleNavigate}
        views={['month']}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: CustomEventComponent,
        }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <CalendarDrawer
          selectedEvent={selectedEvent}
          open={open}
          setOpen={setOpen}
          isDesktop={isDesktop}
        />
      )}
    </div>
  )
}

const CustomEventComponent: React.FC<CustomEventComponentProps> = ({ event }) => {
  return (
    <span>
      ({dayjs(event.start).format('HH:mm')}) - {event.title}
    </span>
  )
}

const CustomToolbar: React.FC<ToolbarProps> = ({ date, onNavigate }) => {
  const goToBack = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1)
    onNavigate('PREV', newDate)
  }

  const goToNext = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    onNavigate('NEXT', newDate)
  }

  const goToCurrent = () => {
    onNavigate('TODAY', new Date())
  }

  return (
    <div className="bg-secondary w-full py-4 px-6 border-x border-t border-[#8c9fb2a2] rounded-t-md">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold capitalize text-lg">{dayjs(date).format('MMMM YYYY')}</h4>
        <div className="items-center flex">
          <Button onClick={goToBack} className="rotate-180" variant="link" arrow></Button>
          <button onClick={goToCurrent} className="font-semibold text-lg ">
            Hoy
          </button>
          <Button onClick={goToNext} variant="link" arrow></Button>
        </div>
      </div>
    </div>
  )
}

export default CalendarBlock
