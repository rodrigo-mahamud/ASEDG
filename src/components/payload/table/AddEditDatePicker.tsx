'use client'

import React, { useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'

import { DateRange } from 'react-day-picker'

import { cn } from '@/utils/utils'
import { Button } from '@/components/lib/button'
import { Calendar } from '@/components/lib/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/lib/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/lib/form'
import { getPeriods } from '@/utils/dashboard/data'
import { Skeleton } from '@/components/lib/skeleton'
import { IconCalendar } from '@tabler/icons-react'

interface DatePeriodPickerProps {
  field: any
}

export function AddEditDatePicker({ field }: DatePeriodPickerProps) {
  const [periodsData, setPeriodsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>()

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        setIsLoading(true)
        const data = await getPeriods()
        setPeriodsData(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching periods:', err)
        setIsLoading(false)
      }
    }

    fetchPeriods()
  }, [])

  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriod(periodId)
    const selectedOption = periodsData?.bookingOptions.find((option) => option.id === periodId)
    if (selectedOption && date?.from) {
      const newEndDate = addDays(date.from, selectedOption.daysAmount)
      setDate({ from: date.from, to: newEndDate })
      field.onChange({ startDate: date.from, endDate: newEndDate, periodId })
    }
  }

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    setSelectedPeriod(undefined)
    if (newDate?.from && newDate?.to) {
      field.onChange({
        startDate: newDate.from,
        endDate: newDate.to,
        periodId: undefined,
      })
    }
  }

  return (
    <FormItem className="flex flex-col space-y-4">
      <div className={cn('grid gap-2')}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal text-base p-3 h-auto rounded-md',
                !date && 'text-muted-foreground',
              )}
            >
              <IconCalendar className="mr-2 h-4 w-4 " />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd LLL, y')} - {format(date.to, 'dd LLL, y')}
                  </>
                ) : (
                  format(date.from, 'dd LLL, y')
                )
              ) : (
                <span>Periodo de reserva</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-6 border-border !mr-5 !mt-2 useTw bg-onTop shadow-xl shadow-black"
            align="start"
          >
            <Calendar
              initialFocus
              className="useTw  p-0"
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
            {isLoading ? (
              <Skeleton className="h-12 w-full mt-6" />
            ) : error ? (
              <div className="text-red-500 mt-6">{error}</div>
            ) : (
              <Select onValueChange={handlePeriodChange} value={selectedPeriod}>
                <FormControl>
                  <SelectTrigger className="mt-6 w-full text-base py-3 h-auto">
                    <SelectValue placeholder="Periodos prededinidos" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="useTw border-border">
                  {periodsData?.bookingOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id} className="text-base">
                      {option.name}: {option.price}€
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <FormMessage />
    </FormItem>
  )
}
