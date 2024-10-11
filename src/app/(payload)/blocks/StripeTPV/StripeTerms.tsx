'use client'
import { Button } from '@/components/lib/button'
import downloadFiles from '@/utils/downloadFiles'
import React from 'react'

export default function StripeTerms({ termsFile }: any) {
  return (
    <button
      key={termsFile.id}
      onClick={() => downloadFiles(termsFile.url, termsFile.filename)}
      className="w-full text-muted-foreground hover:text-gray-900 ease-in-out transition-generic"
    >
      *Al realizar el pago aceptas los términos y condiciones
    </button>
  )
}
