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
import { IconArrowLeft, IconArrowRight, IconSettings, IconX } from '@tabler/icons-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisitorData } from '@/utils/dashboard/types'
import { LogsDetailsInfo } from './LogsDetailsInfo'

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
    if (isDialogOpen) {
      const newLog = logs[currentVideoIndex]
      setCurrentLog(newLog)
      fetchVideo(newLog.videoID)
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
    }
  }

  const handleDownload = () => {
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
        <Button variant="outline" onClick={handleDetailsClick}>
          Ver detalles
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl flex flex-col max-h-[90vh] p-0 overflow-hidden">
        <div className="flex w-full justify-between items-center bg-onTop p-6">
          <DialogHeader>
            <DialogTitle className="useTw">{currentLog.action}</DialogTitle>
          </DialogHeader>
          <div className="flex useTw">
            <Button variant={'outline'} className="w-2/4 mr-6" onClick={handleDownload}>
              <IconSettings size={20} />
              Ajustes
            </Button>
            <Button
              variant={'outline'}
              className="1/4 useTw"
              onClick={() => handleNavigation('prev')}
              disabled={currentVideoIndex === 0}
            >
              <IconArrowLeft size={20} />
            </Button>
            <Button
              variant={'outline'}
              className="1/4 useTw"
              onClick={() => handleNavigation('next')}
              disabled={currentVideoIndex === logs.length - 1}
            >
              <IconArrowRight size={20} />
            </Button>
            <DialogClose asChild>
              <Button variant={'outline'}>
                <IconX size={20}></IconX>
              </Button>
            </DialogClose>
          </div>
        </div>
        <div className="flex w-full gap-6 px-6 pb-6">
          <LogsDetailsInfo
            currentLog={currentLog}
            visitorInfo={visitorInfo}
            isLoadingVisitor={isLoadingVisitor}
          />
          <div className="w-4/6">
            {error ? (
              <p>Error: {error}</p>
            ) : isLoading ? (
              <SkeletonLogVideo />
            ) : localVideoUrl ? (
              <div className="flex flex-col items-center ">
                <video ref={videoRef} controls autoPlay muted className="rounded-xl w-full">
                  <source src={localVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
