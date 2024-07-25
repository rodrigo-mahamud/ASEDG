import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { addDays, format, fromUnixTime, getUnixTime, startOfToday, isSameDay } from 'date-fns'
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
import { FormControl, FormItem, FormMessage } from '@/components/lib/form'
import { getPeriods } from '@/utils/dashboard/data'
import { Skeleton } from '@/components/lib/skeleton'
import { IconCalendar } from '@tabler/icons-react'

interface DatePeriodPickerProps {
  field: {
    value: { start_time?: number; end_time?: number }
    onChange: (value: { start_time?: number; end_time?: number }) => void
  }
}

export function AddEditDatePicker({ field }: DatePeriodPickerProps) {
  const [periodsData, setPeriodsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (field.value.start_time && field.value.end_time) {
      return {
        from: fromUnixTime(field.value.start_time),
        to: fromUnixTime(field.value.end_time),
      }
    }
    return undefined
  })
  const [selectedPeriod, setSelectedPeriod] = useState<string>('custom')

  const fetchPeriods = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getPeriods()
      setPeriodsData(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching periods:', err)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPeriods()
  }, [fetchPeriods])

  const updateSelectedPeriod = useCallback(() => {
    if (date?.from && date?.to && periodsData) {
      const matchingPeriod = periodsData.bookingOptions.find((option) =>
        isSameDay(addDays(date.from, option.daysAmount), date.to),
      )
      setSelectedPeriod(matchingPeriod ? matchingPeriod.id : 'custom')
    }
  }, [date, periodsData])

  useEffect(() => {
    updateSelectedPeriod()
  }, [updateSelectedPeriod])

  const handlePeriodChange = useCallback(
    (periodId: string) => {
      setSelectedPeriod(periodId)
      if (periodId === 'custom') return

      const selectedOption = periodsData?.bookingOptions.find((option) => option.id === periodId)
      if (selectedOption) {
        const startDate = date?.from || startOfToday()
        const endDate = addDays(startDate, selectedOption.daysAmount)
        setDate({ from: startDate, to: endDate })
        field.onChange({
          start_time: getUnixTime(startDate),
          end_time: getUnixTime(endDate),
        })
      }
    },
    [periodsData, date, field],
  )

  const handleDateChange = useCallback(
    (newDate: DateRange | undefined) => {
      setDate(newDate)
      if (newDate?.from && newDate?.to) {
        field.onChange({
          start_time: getUnixTime(newDate.from),
          end_time: getUnixTime(newDate.to),
        })
      }
    },
    [field],
  )

  const selectOptions = useMemo(() => {
    if (!periodsData) return null
    return (
      <>
        <SelectItem value="custom" className="text-base">
          Personalizado
        </SelectItem>
        {periodsData.bookingOptions.map((option) => (
          <SelectItem key={option.id} value={option.id} className="text-base">
            {option.name}: {option.price}€
          </SelectItem>
        ))}
      </>
    )
  }, [periodsData])
  const disabledDays = useMemo(() => {
    const today = startOfToday()
    return { before: today }
  }, [])
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
              disabled={disabledDays}
              className="useTw p-0"
              mode="range"
              defaultMonth={date?.from || new Date()}
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

                <SelectContent className="useTw border-border">{selectOptions}</SelectContent>
              </Select>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <FormMessage />
    </FormItem>
  )
}
