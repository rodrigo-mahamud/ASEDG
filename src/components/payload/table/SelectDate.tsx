import React, { useCallback } from 'react'
import { addDays, getUnixTime, startOfToday } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { FormControl, FormItem, FormMessage } from '@/components/lib/form'

import { Skeleton } from '@/components/lib/skeleton'
import { DatePeriodPickerProps } from '@/utils/dashboard/types'
import { SelectLabel } from '@radix-ui/react-select'

export function SelectDate({ field, periods, isLoading, error }: DatePeriodPickerProps) {
  const handlePeriodChange = useCallback(
    (periodId: string) => {
      const selectedOption = periods?.find((option) => option.id === periodId)
      if (selectedOption) {
        const startDate = startOfToday()
        const endDate = addDays(startDate, selectedOption.daysAmount)
        field.onChange({
          start_time: getUnixTime(startDate),
          end_time: getUnixTime(endDate),
          price: selectedOption.price, // Añadimos el precio
        })
      }
    },
    [periods, field],
  )

  if (isLoading) {
    return <Skeleton className="h-12 w-full" />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <FormItem>
      <Select onValueChange={handlePeriodChange}>
        <FormControl>
          <SelectTrigger className="w-full text-base py-3 h-auto">
            <SelectValue placeholder="Selecciona un periodo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="p-1 border border-border rounded-md shadow-xl shadow-black useTw">
          <SelectGroup>
            <SelectLabel className="py-1.5 px-2 font-semibold text-base">
              Periodos disponibles
            </SelectLabel>
            <SelectSeparator></SelectSeparator>
            {periods?.map((option) => (
              <SelectItem key={option.id} value={option.id} className="text-base">
                {option.name}: {option.price}€
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}
