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
import { getLogVideo } from '@/utils/dashboard/actions'
import { SkeletonLogVideo } from './SkeletonLogVideo'
import {
  IconPlayerPlay,
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconSettings,
  IconX,
} from '@tabler/icons-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@/components/lib/separator'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      fetchVideo(logs[currentVideoIndex].videoID)
      setCurrentLog(logs[currentVideoIndex])
    }
  }, [currentVideoIndex, isDialogOpen])

  useEffect(() => {
    if (videoBlob) {
      const objectUrl = URL.createObjectURL(videoBlob)
      setLocalVideoUrl(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
        if (videoRef.current) {
          videoRef.current.src = ''
        }
      }
    }
  }, [videoBlob])

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
      a.download = `video_${logs[currentVideoIndex].videoID}.mp4`
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
          <div className="w-2/6 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Día:</h3>
              <h4 className="useTw text-lg font-normal capitalize">{currentLog.daystamp}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Hora:</h3>
              <h4 className="useTw text-lg font-normal ">{currentLog.hourstamp}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Usuario:</h3>
              <h4 className="useTw text-lg font-normal ">{currentLog.userName}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Tipo de usuario:</h3>
              <h4 className="useTw text-lg font-normal ">{currentLog.userType}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Acción:</h3>
              <h4 className="useTw text-lg font-normal ">{currentLog.action}</h4>
            </div>
            {currentLog.unlockMethod && (
              <div className="flex justify-between items-center">
                <h3 className="useTw text-lg font-normal ">Método de desbloqueo:</h3>
                <h4 className="useTw text-lg font-normal ">{currentLog.unlockMethod}</h4>
              </div>
            )}
            <Separator className="my-6">
              <div className="flex w-full gap-6 px-6 pb-6"></div>
            </Separator>
          </div>
          <div className="w-4/6">
            {error ? (
              <p>Error: {error}</p>
            ) : localVideoUrl ? (
              <div className="flex flex-col items-center ">
                <video ref={videoRef} controls autoPlay muted className="rounded-xl w-full">
                  <source src={localVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              isLoading && <SkeletonLogVideo />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
