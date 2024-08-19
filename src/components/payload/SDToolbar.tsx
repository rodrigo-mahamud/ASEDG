'use client'
import { IconCalendarMonth, IconSettings, IconSettings2, IconWheel } from '@tabler/icons-react'
import { useDocumentDrawer } from '@payloadcms/ui'
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
import { Button } from '../lib/button'
import DoorButton from './toolbar/DoorButton'
import SettingsMenu from './toolbar/SettingsMenu'

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
    { id: 'day', text: 'Hoy' },
    { id: 'week', text: 'semana pasada' },
    { id: 'currentmonth', text: 'mes actual' },
    { id: 'pastmonth', text: 'mes anterior' },
    { id: 'quarter', text: 'ultimo trimestre' },
    { id: 'year', text: 'año actual' },
  ]
  const getSelectedPeriodText = (id: string | null) => {
    const selectedPeriod = periodos.find((periodo) => periodo.id === id)
    return selectedPeriod ? selectedPeriod.text : 'Mes actual'
  }
  const [DocumentDrawer, DocumentDrawerToggler, { openDrawer }] = useDocumentDrawer({
    id: '669147e907d44f5df704e9c1',
    collectionSlug: 'facilities',
  })

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="useTw text-4xl font-semibold">Hola Alejandro👋</h1>
        <div className="flex gap-3">
          <Select value={period} onValueChange={handlePeriodChange} defaultValue={'currentmonth'}>
            <SelectTrigger className="w-fit focus-visible:outline-none capitalize py-3 px-4 h-fit">
              <SelectValue placeholder={period}>
                <div className="flex items-center text-base">
                  <IconCalendarMonth className="mr-2" size={18} stroke={1.5}></IconCalendarMonth>
                  <span className="mr-2 font-medium">{getSelectedPeriodText(period)}</span>
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
          <SettingsMenu></SettingsMenu>
        </div>
      </div>
    </>
  )
}
