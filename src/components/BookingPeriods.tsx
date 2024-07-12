import React, { useState, useEffect } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/lib/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { IconChevronDown, IconClock } from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { BookingFormTypes } from '@/utils/bookingValidations'

dayjs.locale('es')

interface BookingOption {
  periodType: string
  name: string
  periodLength: number
  price: number
  id: string
}

interface BookingPeriodsProps {
  field: ControllerRenderProps<BookingFormTypes>
  initiallyOpen?: boolean
  data: BookingOption[]
}

export function BookingPeriods({ field, initiallyOpen = false, data }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [endDates, setEndDates] = useState<{ [key: string]: string }>({})
  const { setPrice } = useFormStore()

  useEffect(() => {
    const today = dayjs()
    const dates = data.reduce((acc, option) => {
      if (option.periodType !== 'fixed') {
        acc[option.id] = today.add(option.periodLength, option.periodType).format('DD MMMM YYYY')
      }
      return acc
    }, {} as { [key: string]: string })
    setEndDates(dates)
  }, [data])

  const handleValueChange = (option: BookingOption) => {
    field.onChange(option.id)
    setPrice(option.price)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (field.value) {
      const selectedOption = data.find((option) => option.id === field.value)
      if (selectedOption) {
        return selectedOption.periodType === 'fixed'
          ? `${selectedOption.name} - ${selectedOption.price}€`
          : `${selectedOption.name} - Hasta el ${endDates[selectedOption.id]}`
      }
    }
    return 'Selecciona un período'
  }

  const getPeriodTypeIcon = (periodType: string) => {
    switch (periodType) {
      case 'hours':
        return <IconClock stroke={2} className="h-4 w-4 text-white" />
      // Add more icons for different period types if needed
      default:
        return <IconClock stroke={2} className="h-4 w-4 text-white" />
    }
  }

  return (
    <FormItem>
      <Collapsible
        className="border border-input rounded-t-md"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-secondary ease-in-out duration-300 transition-all">
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
        <CollapsibleContent className=" pb-4">
          <div className="grid gap-y-3">
            {data.map((option) => (
              <div
                key={option.id}
                className={`w-full flex justify-between items-center transition-all ease-out duration-200 hover:bg-secondary cursor-pointer ${
                  field.value === option.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleValueChange(option)}
              >
                <div className="flex justify-between items-center w-full px-4 py-3">
                  <div className="flex space-x-4 w-10/12 items-center">
                    <div className="flex items-center bg-secondaryAlt justify-center w-8 h-8 rounded-full">
                      {getPeriodTypeIcon(option.periodType)}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">{option.name}</p>
                      {option.periodType !== 'fixed' && (
                        <p className="text-sm opacity-75">Hasta el {endDates[option.id]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end w-2/12">
                    <p className="font-semibold">{option.price}€</p>
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
