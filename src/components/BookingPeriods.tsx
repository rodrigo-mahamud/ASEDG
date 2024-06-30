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
  field: ControllerRenderProps<FieldValues, string>
}

export function BookingPeriods({ field }: BookingPeriodsProps) {
  const [isOpen, setIsOpen] = useState(false)
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
            <h3 className="font-semibold">Duracción</h3>
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
            className="ml-2 space-y-1"
            onValueChange={handleValueChange}
            value={field.value || ''}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="border-secondaryAlt text-secondaryAlt/75"
                value="un_dia"
                id="un_dia"
              />
              <Label className="font-normal" htmlFor="un_dia">
                Un día
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="border-secondaryAlt text-secondaryAlt/75"
                value="un_mes"
                id="un_mes"
              />
              <Label className="font-normal" htmlFor="un_mes">
                Un mes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="border-secondaryAlt text-secondaryAlt/75"
                value="tres_meses"
                id="tres_meses"
              />
              <Label className="font-normal" htmlFor="tres_meses">
                Tres meses
              </Label>
            </div>
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>
      {endDate && <p className="text-sm text-gray-500 mt-2">Válido hasta el: {endDate}</p>}
      <FormMessage />
    </FormItem>
  )
}
