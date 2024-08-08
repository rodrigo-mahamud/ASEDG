'use client'

import { IconCalendarMonth } from '@tabler/icons-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../lib/select'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function SDToolbar({ period }: { period: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handlePeriodChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('period', value)
    } else {
      params.delete('period')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const periodos = [
    { id: 'day', text: 'día actual' },
    { id: 'week', text: 'semana pasada' },
    { id: 'currentmonth', text: 'mes actual' },
    { id: 'pastmonth', text: 'mes anterior' },
    { id: 'quarter', text: 'ultimo trimestre' },
  ]
  const getSelectedPeriodText = (id: string | null) => {
    const selectedPeriod = periodos.find((periodo) => periodo.id === id)
    return selectedPeriod ? selectedPeriod.text : 'Mes actual'
  }
  return (
    <div className="flex w-full justify-between">
      <h1 className="useTw text-4xl font-semibold">Hola Alejandro👋</h1>
      <Select value={period} onValueChange={handlePeriodChange} defaultValue={'currentmonth'}>
        <SelectTrigger className="w-56 focus-visible:outline-none useTw">
          <SelectValue placeholder={period}>
            <div className="flex items-center text-base">
              <IconCalendarMonth className="mr-2" size={16} stroke={1.5}></IconCalendarMonth>
              <span className="mr-2">Ver: {getSelectedPeriodText(period)}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="border border-border rounded-md shadow-xl shadow-black useTw"
          align="end"
        >
          <SelectGroup>
            <SelectLabel className="px-2 py-1.5 font-semibold text-base leading-relaxed">
              Periodos
            </SelectLabel>
            <SelectSeparator />
            {periodos.map((periodo) => (
              <SelectItem
                className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                key={periodo.id}
                value={periodo.id}
              >
                {periodo.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
