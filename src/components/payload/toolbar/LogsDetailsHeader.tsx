'use client'
import React from 'react'
import { VisitorData } from '@/utils/dashboard/types'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/lib/dialog'
import { Button } from '@/components/lib/button'
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronCompactDown,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-react'
import { LogsDetailsMenu } from './LogsDetailsMenu'

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
      <DialogHeader>
        <DialogTitle className="useTw text-3xl">{currentLog.action}</DialogTitle>
      </DialogHeader>
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
          <LogsDetailsMenu
            handleVideoDownload={handleVideoDownload}
            visitor={visitorInfo}
          ></LogsDetailsMenu>
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
            <IconX size={18}></IconX>
          </Button>
        </DialogClose>
      </div>
    </>
  )
}
