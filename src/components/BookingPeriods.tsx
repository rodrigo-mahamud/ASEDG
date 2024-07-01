import React, { useState, useEffect } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/lib/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { RadioGroup, RadioGroupItem } from '@/components/lib/radio-group'
import { Label } from '@/components/lib/label'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

dayjs.locale('es')

interface BookingPeriodsProps {
  field: ControllerRenderProps<FieldValues, 'un_dia' | 'un_mes' | 'tres_meses'>
}

export function BookingPeriods({ field }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [endDates, setEndDates] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const today = dayjs()
    const dates = {
      un_dia: today.add(1, 'day').format('DD MMMM YYYY'),
      un_mes: today.add(1, 'month').format('DD MMMM YYYY'),
      tres_meses: today.add(3, 'months').format('DD MMMM YYYY'),
    }
    setEndDates(dates)
  }, [])

  const handleValueChange = (value: string) => {
    field.onChange(value)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    switch (field.value) {
      case 'un_dia':
        return 'Un día'
      case 'un_mes':
        return 'Un mes'
      case 'tres_meses':
        return 'Tres meses'
      default:
        return 'Elige la duración de tu reserva.'
    }
  }

  return (
    <FormItem>
      <Collapsible
        className="border border-input rounded-t-md"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 ">
          <div className="flex flex-col text-start justify-start w-10/12">
            <h3 className="font-semibold">Duración</h3>
            <h4 className="text-sm"> {getDisplayText()}</h4>
          </div>
          <div className=" pr-2 ">
            <IconChevronDown
              stroke={1.5}
              className={`h-5 w-5 transition-transform duration-300 text-secondaryAlt ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <RadioGroup
            className="ml-2 pb-2 space-y-1"
            onValueChange={handleValueChange}
            value={field.value || undefined}
          >
            {Object.entries(endDates).map(([period, date]) => (
              <div key={period} className="flex items-center space-x-3">
                <RadioGroupItem
                  className="border-secondaryAlt text-secondaryAlt/75"
                  value={period}
                  id={period}
                />
                <Label className="font-normal" htmlFor={period}>
                  <div>
                    {period === 'un_dia' ? 'Un día' : period === 'un_mes' ? 'Un mes' : 'Tres meses'}
                  </div>
                  <div className="text-xs text-gray-500">Hasta el {date}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>
      {/* {field.value && endDates[field.value] && (
        <p className="text-sm text-gray-500 mt-2">Válido hasta el: {endDates[field.value]}</p>
      )} */}
      <FormMessage />
    </FormItem>
  )
}
