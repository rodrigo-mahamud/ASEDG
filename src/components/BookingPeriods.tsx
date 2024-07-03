import React, { useState, useEffect } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/lib/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import {
  IconChevronDown,
  IconCalendarMonth,
  IconCalendarEvent,
  IconCheck,
  IconHours24,
  IconCalendarWeek,
  IconStack2,
} from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

interface BookingPeriodsProps {
  field: any
  initiallyOpen?: boolean
}

const PRICES = {
  un_dia: 49.99,
  un_mes: 199.99,
  tres_meses: 499.99,
}

type PeriodKey = keyof typeof PRICES

const PERIOD_INFO: Record<PeriodKey, { icon: React.ElementType; title: string }> = {
  un_dia: { icon: IconHours24, title: 'Diario' },
  un_mes: { icon: IconCalendarMonth, title: 'Mensual' },
  tres_meses: { icon: IconStack2, title: 'Trimestral' },
}

export function BookingPeriods({ field, initiallyOpen = false }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [endDates, setEndDates] = useState<{ [key in PeriodKey]: string }>(
    {} as { [key in PeriodKey]: string },
  )
  const { setPrice } = useFormStore()

  useEffect(() => {
    const today = dayjs()
    const dates = {
      un_dia: today.add(1, 'day').format('DD MMMM YYYY'),
      un_mes: today.add(1, 'month').format('DD MMMM YYYY'),
      tres_meses: today.add(3, 'months').format('DD MMMM YYYY'),
    }
    setEndDates(dates)
  }, [])

  const handleValueChange = (value: PeriodKey) => {
    field.onChange(value)
    setPrice(PRICES[value])
    setIsOpen(false)
  }
  const getDisplayText = () => {
    if (field.value && PERIOD_INFO[field.value as PeriodKey]) {
      const { title } = PERIOD_INFO[field.value as PeriodKey]
      return `${title} - Hasta el ${endDates[field.value as PeriodKey]}`
    }
    return 'Selecciona un período'
  }
  return (
    <FormItem>
      <Collapsible
        className="border border-input rounded-md"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
          <div className="flex flex-col text-start justify-start w-10/12">
            <h3 className="text-lg font-semibold">Duración</h3>
            <h4 className="text-sm">{getDisplayText()}</h4>
          </div>
          <div className="pr-2">
            <IconChevronDown
              stroke={1.5}
              className={`h-5 w-5 transition-transform duration-300 text-secondaryAlt ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="grid gap-3">
            {(Object.keys(PRICES) as PeriodKey[]).map((period) => {
              const { icon: Icon, title } = PERIOD_INFO[period]
              return (
                <div
                  key={period}
                  className={`w-full flex justify-between items-center rounded-sm p-3 transition-all hover:bg-secondary cursor-pointer ${
                    field.value === period ? 'bg-secondary' : ''
                  }`}
                  onClick={() => handleValueChange(period)}
                >
                  <div className="flex space-x-4">
                    <Icon stroke={1.5} className="mt-[3px] h-5 w-5" />
                    <div className="flex flex-col">
                      <p className=" font-semibold">
                        {PRICES[period]}€ {title}
                      </p>
                      <p className="text-sm text-muted-foreground">Hasta el {endDates[period]}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <FormMessage />
    </FormItem>
  )
}
