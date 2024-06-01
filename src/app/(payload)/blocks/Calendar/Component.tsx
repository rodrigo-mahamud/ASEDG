'use client'
import React, { useState } from 'react'
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

const events: CustomEvent[] = [
  {
    title: 'Jornassssdas de cultura en el centro juvenil',
    start: new Date(2024, 4, 4, 10, 0),
    end: new Date(2024, 4, 4, 12, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
  {
    title: 'Jornadas de cultura en el centro juvenil',
    start: new Date(2024, 4, 17, 9, 0),
    end: new Date(2024, 4, 17, 11, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
  {
    title: 'Jornadas de cultura en el centro juvenil',
    start: new Date(2024, 4, 23, 14, 0),
    end: new Date(2024, 4, 23, 16, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
  {
    title: 'Jornadas de cultura en el centro juvenil',
    start: new Date(2024, 4, 1, 10, 0),
    end: new Date(2024, 4, 3, 12, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
  {
    title: 'Jornadas de cultura en el centro juvenil',
    start: new Date(2024, 4, 20, 8, 0),
    end: new Date(2024, 4, 23, 17, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
  {
    title: 'Jornadas de cultura en el centro juvenil',
    start: new Date(2024, 4, 28, 13, 0),
    end: new Date(2024, 4, 28, 15, 0),
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, velit. Eligendi, velit vitae dicta ducimus nemo enim accusantium quas eius officia officiis molestias, odit labore expedita repellat quaerat sit. Aut?',
    location: 'Plaza mayor san esteban de gormaz',
    img: 'placeholder2.jpg',
  },
].map((event, index) => ({ ...event, color: colors[index % colors.length] }))

const CalendarBlock: React.FC = () => {
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
        events={events}
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
      <CalendarDrawer
        selectedEvent={selectedEvent}
        open={open}
        setOpen={setOpen}
        isDesktop={isDesktop}
      />
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
    const newDate = new Date(date.setMonth(date.getMonth() - 1))
    onNavigate('PREV', newDate)
  }

  const goToNext = () => {
    const newDate = new Date(date.setMonth(date.getMonth() + 1))
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
