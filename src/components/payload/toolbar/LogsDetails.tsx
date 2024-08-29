'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/lib/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/lib/dialog'
import { getLogVideo, getSpecificVisitor } from '@/utils/dashboard/actions'
import { SkeletonLogVideo } from './SkeletonLogVideo'
import {
  IconArrowLeft,
  IconArrowRight,
  IconDots,
  IconPlug,
  IconPlus,
  IconSettings,
  IconX,
} from '@tabler/icons-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisitorData } from '@/utils/dashboard/types'
import { LogsDetailsInfo } from './LogsDetailsInfo'
import { LogsDetailsMenu } from './LogsDetailsMenu'
import { LogsDetailsHeader } from './LogsDetailsHeader'

interface LogsDetailsProps {
  log: any
  logs: any[]
  currentIndex: number
}

export function LogsDetails({ log, logs, currentIndex }: LogsDetailsProps) {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(currentIndex)
  const [currentLog, setCurrentLog] = useState(log)
  const [visitorInfo, setVisitorInfo] = useState<VisitorData | null>(null)
  const [isLoadingVisitor, setIsLoadingVisitor] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const newLog = logs[currentVideoIndex]
    if (isDialogOpen) {
      setCurrentLog(newLog)
      fetchVideo(newLog.videoID)
    }
    if (isDialogOpen && newLog.userID) {
      fetchVisitorInfo(newLog.userID)
    }
  }, [currentVideoIndex, isDialogOpen, logs])

  useEffect(() => {
    if (videoBlob) {
      const objectUrl = URL.createObjectURL(videoBlob)
      setLocalVideoUrl(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
        setLocalVideoUrl(null)
      }
    }
  }, [videoBlob])

  useEffect(() => {
    if (videoRef.current && localVideoUrl) {
      videoRef.current.load()
    }
  }, [localVideoUrl])

  const fetchVisitorInfo = async (id: string) => {
    if (!id) return
    setIsLoadingVisitor(true)
    try {
      const visitorData = await getSpecificVisitor(id)
      setVisitorInfo(visitorData.data)
    } catch (error) {
      console.error('Error fetching visitor info:', error)
      setError('Error al cargar la información del visitante')
    } finally {
      setIsLoadingVisitor(false)
    }
  }

  const fetchVideo = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const blob = await getLogVideo(id)
      setVideoBlob(blob)
    } catch (error) {
      console.error('Error fetching video:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDetailsClick = () => {
    setIsDialogOpen(true)
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentVideoIndex - 1 : currentVideoIndex + 1
    if (newIndex >= 0 && newIndex < logs.length) {
      setCurrentVideoIndex(newIndex)
      setVisitorInfo(null)
    }
  }

  const handleVideoDownload = () => {
    if (videoBlob) {
      const url = window.URL.createObjectURL(videoBlob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `video_${currentLog.videoID}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 border-border rounded-md p-0"
          onClick={handleDetailsClick}
        >
          <IconDots size={16}></IconDots>
        </Button>
      </DialogTrigger>
      <DialogContent
        closeDefault={false}
        className="w-full max-w-5xl h-[62rem] gap-6 flex flex-col p-0 overflow-hidden"
      >
        <div className="relative flex w-full justify-between items-center bg-onTop p-6">
          <LogsDetailsHeader
            logs={logs}
            handleNavigation={handleNavigation}
            currentLog={currentLog}
            visitorInfo={visitorInfo}
            currentVideoIndex={currentVideoIndex}
            handleVideoDownload={handleVideoDownload}
          ></LogsDetailsHeader>
        </div>
        <div className="flex w-full h-full relative gap-6 px-6 mb-6">
          <div className="w-2/6 space-y-4">
            <LogsDetailsInfo
              currentLog={currentLog}
              visitorInfo={visitorInfo}
              isLoadingVisitor={isLoadingVisitor}
            />
          </div>

          <div className="w-4/6 relative h-full">
            {error ? (
              <p>Error: {error}</p>
            ) : isLoading ? (
              <SkeletonLogVideo />
            ) : localVideoUrl ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                muted
                className="rounded-xl size-full object-cover"
              >
                <source src={localVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
