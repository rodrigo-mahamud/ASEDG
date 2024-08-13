'use client'
import { useCallback, useEffect } from 'react'
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
          price: selectedOption.price,
          period_id: selectedOption.id,
        })
      }
    },
    [periods, field],
  )

  useEffect(() => {
    if (field.value.period_id && periods) {
      handlePeriodChange(field.value.period_id)
    }
  }, [field.value.period_id, periods, handlePeriodChange])

  if (isLoading) {
    return <Skeleton className="h-12 w-full" />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <FormItem className="w-4/5">
      <Select onValueChange={handlePeriodChange} defaultValue={field.value.period_id}>
        <FormControl>
          <SelectTrigger className="w-full text-base py-3 h-auto border-r-0 rounded-r-none">
            <SelectValue placeholder="Selecciona un periodo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="p-1 border border-border rounded-md shadow-xl shadow-black useTw">
          <SelectGroup>
            <SelectLabel className="py-1.5 px-2 font-semibold text-base">
              Periodos disponibles
            </SelectLabel>
            <SelectSeparator />
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
