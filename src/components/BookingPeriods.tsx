import React, { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/ui/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  IconChevronDown,
  IconCircle,
  IconCircleDotFilled,
  IconCircleFilled,
  IconClock,
} from '@tabler/icons-react'
import useBookingState from '@/utils/useBookingState'
import { calculateTotalDays, formatPeriod, getEndDate } from '@/utils/bookingDateFormat'
import { BookingFormTypes } from '@/utils/bookingValidations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import DynamicIcon from './DynamicIcon'

interface BookingOption {
  name: string
  icon: string
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
      <div className="grid gap-y-3 pb-6">
        {data.map((option) => (
          <div
            key={option.id}
            className={`w-full active:scale-95 md:active:scale-100 flex justify-between border rounded-md items-center transition-all ease-out duration-200 md:hover:bg-secondary cursor-pointer ${
              field.value === option.daysAmount ? 'border-foreground' : 'border-input'
            }`}
            onClick={() => handleValueChange(option)}
          >
            <div className="flex justify-between items-center w-full px-4 py-3 ">
              <div className="flex space-x-4 w-10/12 items-center">
                <div className="flex items-center bg-secondaryAlt justify-center w-9 h-9 rounded-full">
                  <DynamicIcon
                    iconName={option.icon}
                    className="size-5 text-white"
                    stroke={2}
                  ></DynamicIcon>
                </div>
                <div className="flex flex-col ">
                  <p className="text-base font-semibold">
                    {option.name} {option.price}€
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hasta el {getEndDate(option.daysAmount)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end w-2/12">
                <IconCircleDotFilled
                  className={`size-5 absolute ${
                    field.value === option.daysAmount ? 'opacity-100' : 'opacity-0'
                  }`}
                ></IconCircleDotFilled>
                <IconCircle
                  className={`size-5 ${
                    field.value === option.daysAmount ? 'opacity-0' : 'opacity-100'
                  }`}
                ></IconCircle>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Accordion type="single" collapsible className="border border-input rounded-t-md">
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex justify-between items-center w-full px-5 py-3 md:hover:bg-secondary ease-in-out duration-300 transition-all">
            <div className="flex flex-col text-start justify-start w-10/12">
              <h3 className="text-base font-semibold">Tipo de reserva</h3>
              <h4 className="text-sm text-muted-foreground">{getDisplayText()}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent className="md:pb-4">

          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      <FormMessage />
    </FormItem>
  )
}
