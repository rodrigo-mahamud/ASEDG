import React, { useState, useEffect } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/lib/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { IconChevronDown, IconHours24 } from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { BookingFormTypes } from '@/utils/bookingValidations'

dayjs.locale('es')

interface BookingOption {
  name: string
  days: number
  price: number
  id: string
}

interface BookingPeriodsData {
  bookingType: string
  dailyOptions: BookingOption[]
}

interface BookingPeriodsProps {
  field: ControllerRenderProps<BookingFormTypes>
  initiallyOpen?: boolean
  data: BookingPeriodsData
}

export function BookingPeriods({ field, initiallyOpen = false, data }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [endDates, setEndDates] = useState<{ [key: string]: string }>({})
  const { setPrice } = useFormStore()

  useEffect(() => {
    const today = dayjs()
    const dates = data.dailyOptions.reduce((acc, option) => {
      acc[option.id] = today.add(option.days, 'day').format('DD MMMM YYYY')
      return acc
    }, {} as { [key: string]: string })
    setEndDates(dates)
  }, [data.dailyOptions])

  const handleValueChange = (option: BookingOption) => {
    field.onChange(option.days)
    setPrice(option.price)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (field.value) {
      const selectedOption = data.dailyOptions.find((option) => option.days === field.value)
      if (selectedOption) {
        return `${selectedOption.name} - Hasta el ${endDates[selectedOption.id]}`
      }
    }
    return 'Selecciona un período'
  }

  return (
    <FormItem>
      <Collapsible
        className="border border-input rounded-t-md"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-secondary ease-in-out duration-200">
          <div className="flex flex-col text-start justify-start w-10/12">
            <h3 className="text-lg font-semibold">Tipo de reserva</h3>
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
            {data.dailyOptions.map((option) => (
              <div
                key={option.id}
                className={`w-full flex justify-between items-center rounded-sm p-3 transition-all hover:bg-secondary cursor-pointer ${
                  field.value === option.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleValueChange(option)}
              >
                <div className="flex space-x-4">
                  <IconHours24 stroke={1.5} className="mt-[3px] h-5 w-5" />
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      {option.price}€ {option.name}
                    </p>
                    <p className="text-sm opacity-75">Hasta el {endDates[option.id]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <FormMessage />
    </FormItem>
  )
}
