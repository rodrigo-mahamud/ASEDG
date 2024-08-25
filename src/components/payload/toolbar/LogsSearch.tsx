'use client'
import { Input } from '@/components/lib/input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

export default function LogsSearch() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('logsquery', term)
    } else {
      params.delete('logsquery')
    }
    replace(`${pathName}?${params.toString()}`)
  }
  return (
    <Input
      placeholder="Buscar en registros"
      onChange={(event) => handleSearch(event.target.value)}
      className="w-80 text-base"
      defaultValue={searchParams.get('logsquery')?.toString()}
    />
  )
}
