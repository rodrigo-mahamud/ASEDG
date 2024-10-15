'use client'

import downloadFiles from '@/utils/downloadFiles'
import { cn } from '@/utils/utils'
import React from 'react'

export default function DownloadTerms({ termsFile, children, className, target }: any) {
  return (
    <>
      {target === '_blank' ? (
        <a
          key={termsFile.id}
          href={termsFile.url}
          target="_blank"
          className={cn(`w-full transition-generic ${className}`)}
        >
          {children}
        </a>
      ) : (
        <button
          key={termsFile.id}
          onClick={() => downloadFiles(termsFile.url, termsFile.filename)}
          className={cn(`w-full transition-generic ${className}`)}
        >
          {children}
        </button>
      )}
    </>
  )
}
