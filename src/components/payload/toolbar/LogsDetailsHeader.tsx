'use client'
import React from 'react'
import { VisitorData } from '@/utils/dashboard/types'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/lib/dialog'
import { Button } from '@/components/lib/button'
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react'
import { LogsDetailsMenu } from './LogsDetailsMenu'
import { IconDisplay } from '@/components/IconDisplay'

export function LogsDetailsHeader({
  handleNavigation,
  logs,
  currentLog,
  currentVideoIndex,
  visitorInfo,
  handleVideoDownload,
}: any) {
  return (
    <>
      <div className="flex items-center gap-1">
        <IconDisplay iconName={currentLog.action.icon} size={22} />
        <span className="text-2xl font-semibold">{currentLog.action.text}</span>
      </div>
      <div className="flex gap-4 useTw">
        <div className="flex">
          <Button
            variant={'outline'}
            className="aspect-square useTw p-0 rounded-l-md"
            onClick={() => handleNavigation('prev')}
            disabled={currentVideoIndex === 0}
          >
            <IconChevronLeft size={18} />
          </Button>
          <LogsDetailsMenu handleVideoDownload={handleVideoDownload} visitor={visitorInfo} />
          <Button
            variant={'outline'}
            className="aspect-square useTw p-0 rounded-r-md"
            onClick={() => handleNavigation('next')}
            disabled={currentVideoIndex === logs.length - 1}
          >
            <IconChevronRight size={18} />
          </Button>
        </div>
        <DialogClose asChild>
          <Button variant={'outline'} className="aspect-square useTw p-0 rounded-md">
            <IconX size={18} />
          </Button>
        </DialogClose>
      </div>
    </>
  )
}
