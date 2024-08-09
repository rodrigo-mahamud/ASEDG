import React, { useEffect, useState, useCallback } from 'react'
import { addDays, getUnixTime, startOfToday } from 'date-fns'
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
import { DatePeriodPickerProps, PeriodsData } from '@/utils/dashboard/types'

export function SelectDate({ field }: DatePeriodPickerProps) {
  const [periodsData, setPeriodsData] = useState<PeriodsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPeriods = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getPeriods()
      setPeriodsData(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching periods:', err)
      setError('Error fetching periods')
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPeriods()
  }, [fetchPeriods])

  const handlePeriodChange = useCallback(
    (periodId: string) => {
      const selectedOption = periodsData?.bookingOptions.find((option) => option.id === periodId)
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
    [periodsData, field],
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
        <SelectContent className="useTw border-border">
          {periodsData?.bookingOptions.map((option) => (
            <SelectItem key={option.id} value={option.id} className="text-base">
              {option.name}: {option.price}€
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}
