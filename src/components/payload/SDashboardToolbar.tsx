'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { IconCalendarMonth } from '@tabler/icons-react'
import { Button } from '../lib/button'
import { SelectSeparator } from '../lib/select'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function SDashboardToolbar() {
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

  return (
    <div className="flex w-full justify-between">
      <h1 className="useTw text-4xl font-semibold">Hola Alejandro👋</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto rounded-md border-border text-base">
            <IconCalendarMonth className="mr-2" stroke={1.5} size={16} />
            Ver Periodo
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-1 w-44 border border-border rounded-md shadow-xl shadow-black useTw"
          align="end"
        >
          <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-base">
            Periodos
          </DropdownMenuLabel>
          <SelectSeparator />
          <DropdownMenuRadioGroup
            value={searchParams.get('period')?.toString()}
            onValueChange={handlePeriodChange}
            defaultValue={searchParams.get('period')?.toString()}
          >
            <DropdownMenuRadioItem value="diaria">Ultimas 24h</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mesactual">Este mes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mespasado">Mes pasado</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="trimestre">Trimestre</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
