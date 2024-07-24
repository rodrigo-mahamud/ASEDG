import React from 'react'
import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
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

interface DatePeriodPickerProps {
  periodsData: {
    bookingOptions: Array<{
      id: string
      name: string
      price: number
      daysAmount: number
    }>
  }
  field: any
}

export function AddEditDatePicker({ periodsData, field }: DatePeriodPickerProps) {
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = React.useState<Date | undefined>()
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | undefined>()

  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriod(periodId)
    const selectedOption = periodsData.bookingOptions.find((option) => option.id === periodId)
    if (selectedOption && startDate) {
      const newEndDate = new Date(startDate)
      newEndDate.setDate(newEndDate.getDate() + selectedOption.daysAmount)
      setEndDate(newEndDate)
      field.onChange({ startDate, endDate: newEndDate, periodId })
    }
  }

  const handleDateChange = (date: Date | undefined, isStart: boolean) => {
    if (isStart) {
      setStartDate(date)
      setSelectedPeriod(undefined)
      if (date && endDate && date > endDate) {
        setEndDate(undefined)
      }
    } else {
      setEndDate(date)
      setSelectedPeriod(undefined)
    }
    field.onChange({
      startDate: isStart ? date : startDate,
      endDate: isStart ? endDate : date,
      periodId: undefined,
    })
  }

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Período</FormLabel>
      <Select onValueChange={handlePeriodChange} value={selectedPeriod}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un período predefinido" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {periodsData.bookingOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name} - {option.price}€ - {option.daysAmount} días
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex space-x-2 mt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !startDate && 'text-muted-foreground',
              )}
            >
              <IconCalendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : <span>Fecha inicial</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => handleDateChange(date, true)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !endDate && 'text-muted-foreground',
              )}
            >
              <IconCalendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'PPP') : <span>Fecha final</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => handleDateChange(date, false)}
              initialFocus
              disabled={(date) => date < (startDate || new Date())}
            />
          </PopoverContent>
        </Popover>
      </div>
      <FormMessage />
    </FormItem>
  )
}
