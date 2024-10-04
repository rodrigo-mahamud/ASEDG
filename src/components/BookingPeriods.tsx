import React, { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/lib/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/collapsible'
import { IconChevronDown, IconClock } from '@tabler/icons-react'
import useBookingState from '@/utils/useBookingState'
import { calculateTotalDays, formatPeriod, getEndDate } from '@/utils/bookingDateFormat'
import { BookingFormTypes } from '@/utils/bookingValidations'

interface BookingOption {
  name: string
  daysAmount: number
  price: number
  id: string
}

interface BookingPeriodsProps {
  field: ControllerRenderProps<BookingFormTypes, 'daysAmount'>
  initiallyOpen?: boolean
  data: BookingOption[]
}

export function BookingPeriods({ field, initiallyOpen = false, data }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const { setPrice } = useBookingState()

  const handleValueChange = (option: BookingOption) => {
    field.onChange(option.daysAmount)
    setPrice(option.price)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    const selectedOption = data.find((option) => option.daysAmount === field.value)
    if (selectedOption) {
      const endDate = getEndDate(selectedOption.daysAmount)
      return `${selectedOption.name} - Hasta el ${endDate}`
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
        <CollapsibleTrigger className="flex justify-between items-center w-full px-5 py-3 hover:bg-secondary ease-in-out duration-300 transition-all">
          <div className="flex flex-col text-start justify-start w-10/12">
            <h3 className="text-base font-semibold">Tipo de reserva</h3>
            <h4 className="text-sm text-muted-foreground">{getDisplayText()}</h4>
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
                  field.value === option.daysAmount ? 'bg-secondary' : ''
                }`}
                onClick={() => handleValueChange(option)}
              >
                <div className="flex justify-between items-center w-full px-4 py-3">
                  <div className="flex space-x-4 w-9/12 items-center">
                    <div className="flex items-center bg-secondaryAlt justify-center w-8 h-8 rounded-full">
                      <IconClock stroke={2} className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">{option.name}</p>
                      <p className="text-xs opacity-75">Hasta el {getEndDate(option.daysAmount)}</p>
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
