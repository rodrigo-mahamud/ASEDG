// BookingPeriods.tsx
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem, FormMessage } from '@/components/ui/form'
import { IconCircle, IconCircleCheckFilled } from '@tabler/icons-react'
import useBookingState from '@/utils/useBookingState'
import { getEndDate } from '@/utils/bookingDateFormat'
import { BookingFormTypes } from '@/utils/bookingValidations'
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
  data: BookingOption[]
}

export function BookingPeriods({ field, data }: BookingPeriodsProps) {
  const { setPrice, selectedPeriodId, setSelectedPeriodId } = useBookingState()

  const handleValueChange = (option: BookingOption, e: React.MouseEvent) => {
    e.stopPropagation()

    // Si el item ya está seleccionado, lo deseleccionamos
    if (selectedPeriodId === option.id) {
      field.onChange(null)
      setSelectedPeriodId(null)
      setPrice(0)
      return
    }

    // Ejecutar los cambios en un único ciclo para evitar race conditions
    Promise.resolve().then(() => {
      field.onChange(option.daysAmount)
      setSelectedPeriodId(option.id)
      setPrice(option.price)
    })
  }

  // Buscar y establecer el período inicial si existe un daysAmount pero no hay selectedPeriodId
  React.useEffect(() => {
    if (field.value && !selectedPeriodId) {
      const option = data.find((opt) => opt.daysAmount === field.value)
      if (option) {
        setSelectedPeriodId(option.id)
        setPrice(option.price)
      }
    }
  }, [field.value, selectedPeriodId, data, setSelectedPeriodId, setPrice])

  return (
    <FormItem>
      <div className="grid gap-y-3 pb-6 md:pb-5">
        {data.map((option) => {
          const isSelected = selectedPeriodId === option.id

          return (
            <div
              key={option.id}
              className={`w-full active:scale-95 md:active:scale-100 flex justify-between border rounded-md items-center transition-all ease-out duration-200 md:hover:bg-secondary cursor-pointer ${
                isSelected ? 'border-foreground' : 'border-border'
              }`}
              onClick={(e) => handleValueChange(option, e)}
            >
              <div className="flex justify-between items-center w-full px-4 py-3">
                <div className="flex space-x-4 w-10/12 items-center">
                  <div className="flex items-center bg-secondaryAlt justify-center w-9 h-9 rounded-full">
                    <DynamicIcon iconName={option.icon} className="size-5 text-white" stroke={2} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold line-clamp-1">
                      {option.name} {option.price}€
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hasta el {getEndDate(option.daysAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end w-2/12">
                  <IconCircleCheckFilled
                    className={`size-7 absolute transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <IconCircle
                    stroke={1}
                    className={`size-7 transition-opacity duration-200 text-border ${
                      isSelected ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <FormMessage />
    </FormItem>
  )
}
