// components/BookingPeriods.tsx
import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/lib/form'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

interface BookingPeriodsProps {
  field: ControllerRenderProps<FieldValues, string>
}

export function BookingPeriods({ field }: BookingPeriodsProps) {
  const [endDate, setEndDate] = useState<string | null>(null)

  useEffect(() => {
    if (field.value) {
      const today = dayjs()
      let end
      switch (field.value) {
        case 'un_dia':
          end = today.add(1, 'day')
          break
        case 'un_mes':
          end = today.add(1, 'month')
          break
        case 'tres_meses':
          end = today.add(3, 'months')
          break
        default:
          end = null
      }
      setEndDate(end ? end.format('DD/MM/YYYY') : null)
    } else {
      setEndDate(null)
    }
  }, [field.value])

  return (
    <FormItem>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un periodo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="un_dia">Un día</SelectItem>
          <SelectItem value="un_mes">Un mes</SelectItem>
          <SelectItem value="tres_meses">Tres meses</SelectItem>
        </SelectContent>
      </Select>
      {endDate && <p className="text-sm text-gray-500 mt-2">Valido hasta el: {endDate}</p>}
      <FormMessage />
    </FormItem>
  )
}
