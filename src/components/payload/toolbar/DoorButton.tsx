import { Button } from '@/components/lib/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@/components/lib/select'
import { openDoor } from '@/utils/dashboard/data'
import React from 'react'
import { toast } from '@payloadcms/ui'

export default function DoorButton() {
  async function handleOpenDoor(minutes?: number) {
    const result = await openDoor(minutes)
    if (result.success) {
      toast.success('aBRIda')
    } else {
      toast.error('NO aBRIda')
    }
  }
  return (
    <div className="flex">
      <Button
        variant="outline"
        onClick={() => handleOpenDoor()}
        className="rounded-md border-border rounded-r-none border-r-0 text-base py-3 h-fit"
      >
        Abrir Puerta
      </Button>
      <Select value={'a'}>
        <SelectTrigger className="w-fit px-3 h-full rounded-l-none focus-visible:outline-none "></SelectTrigger>
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
              value={'hh'}
            >
              Mantener abierto Xmin
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
