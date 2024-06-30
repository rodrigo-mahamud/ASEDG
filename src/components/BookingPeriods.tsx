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

  const handleValueChange = (value: string) => {
    field.onChange(value)
  }

  return (
    <FormItem>
      <Select onValueChange={handleValueChange} value={field.value || ''}>
        <FormControl>
          <SelectTrigger className="p-4 h-auto rounded-b-none ">
            <div className="flex flex-col text-start justify-start w-10/12">
              <h3 className="text-lg">Duracción</h3>
              <h4 className="text-xs">
                Selecciona por cuanto tiempo deseas reservar esta instalación
              </h4>
            </div>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="un_dia">Un día</SelectItem>
          <SelectItem value="un_mes">Un mes</SelectItem>
          <SelectItem value="tres_meses">Tres meses</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}
