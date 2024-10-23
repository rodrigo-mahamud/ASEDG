'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import { cn } from '@/utils/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IconCalendar } from '@tabler/icons-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DatePickerWithRangeProps {
  className?: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  onPresetChange?: (preset: string) => void
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  onPresetChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)

  React.useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    if (onChange) {
      onChange(newDate)
    }
  }

  const handlePresetChange = (preset: string) => {
    if (onPresetChange) {
      onPresetChange(preset)
    }
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className,
            )}
          >
            <IconCalendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d 'de' MMMM, yyyy", { locale: es })} -{' '}
                  {format(date.to, "d 'de' MMMM, yyyy", { locale: es })}
                </>
              ) : (
                format(date.from, "d 'de' MMMM, yyyy", { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="useTw w-auto p-0 bg-onTop !mt-2 shadow-lg shadow-black border border-border"
          align="end"
        >
          <div className="p-4 space-y-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              locale={es}
            />
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger className="dark:bg-white/5">
                <SelectValue placeholder="Seleccionar periodo predefinido" />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-onTop shadow-lg shadow-black">
                <SelectItem value="day">Día</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mes</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
