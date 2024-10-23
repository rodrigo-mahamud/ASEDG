'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import { IconFilter } from '@tabler/icons-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

export default function LogsType() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const logsTypes = [
    { id: 'critical', text: 'critical' },
    { id: 'door_openings', text: 'mes actual' },
    { id: 'updates', text: 'mes anterior' },
    { id: 'device_events', text: 'ultimo trimestre' },
    { id: 'admin_activity', text: 'año actual' },
    { id: 'visitor', text: 'año actual' },
  ]

  const handletypeChange = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('logsType', term)
    } else {
      params.delete('logsType')
    }
    replace(`${pathName}?${params.toString()}`)
  }
  return (
    <Select
      value={searchParams.get('logsType')?.toString()}
      onValueChange={handletypeChange}
      defaultValue={searchParams.get('logsType')?.toString()}
    >
      <SelectTrigger className="w-fit focus-visible:outline-none capitalize py-3 px-4 h-fit useTw">
        <SelectValue placeholder={searchParams.get('logsType')?.toString()}>
          <div className="flex items-center text-base">
            <IconFilter className="mr-2" size={18} stroke={1.5}></IconFilter>
            Filtrar
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
          <SelectItem
            className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
            key="algo"
            value="all"
          >
            Ver Todos
          </SelectItem>
          <SelectSeparator />
          {logsTypes.map((types) => (
            <SelectItem
              className="capitalize text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
              key={types.id}
              value={types.id}
            >
              {types.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
