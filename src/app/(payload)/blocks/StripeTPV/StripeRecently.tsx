'use client'
import { Alert, AlertDescription } from '@/components/lib/alert'
import { Badge } from '@/components/lib/badge'
import { IconInfoCircle } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

export default function StripeRecently() {
  const [recentlyPurchased, setRecentlyPurchased] = useState(false)
  useEffect(() => {
    const checkRecentPurchase = () => {
      const paidRecently = localStorage.getItem('paidRecently')
      if (paidRecently) {
        const { timestamp, url } = JSON.parse(paidRecently)
        const currentTime = new Date().getTime()
        if (currentTime - timestamp < 24 * 60 * 60 * 1000 && url === window.location.href) {
          setRecentlyPurchased(true)
        } else {
          localStorage.removeItem('paidRecently')
        }
      }
    }

    checkRecentPurchase()
  }, [])
  return (
    <>
      {recentlyPurchased && (
        <Badge
          variant="default"
          className="rounded-full flex gap-1 items-center py-1 px-3 w-fit bg-indigo-50 text-indigo-500 border-0 hover:bg-indigo-50"
        >
          <IconInfoCircle className="w-3 h-3 !text-indigo-500 " stroke={1.75}></IconInfoCircle>
          <span className="text-xs font-normal">Pagado hoy</span>
        </Badge>
      )}
    </>
  )
}
