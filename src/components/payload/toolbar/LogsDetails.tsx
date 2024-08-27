'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/lib/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/lib/dialog'
import { getLogVideo } from '@/utils/dashboard/actions'
import { SkeletonLogVideo } from './SkeletonLogVideo'
import {
  IconPlayerPlay,
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconSettings,
} from '@tabler/icons-react'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      fetchVideo(logs[currentVideoIndex].videoID)
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
      <DialogContent className="w-full max-w-4xl flex flex-col max-h-[90vh] bg-red-600">
        <div className="flex justify-end w-full">
          <Button className="w-2/4" onClick={handleDownload}>
            <IconSettings size={20} />
            Ajustes
          </Button>
          <Button
            className="1/4"
            onClick={() => handleNavigation('prev')}
            disabled={currentVideoIndex === 0}
          >
            <IconArrowLeft size={20} />
          </Button>
          <Button
            className="1/4"
            onClick={() => handleNavigation('next')}
            disabled={currentVideoIndex === logs.length - 1}
          >
            <IconArrowRight size={20} />
          </Button>
        </div>
        <div className="flex w-full">
          <div className="w-2/6">
            <strong>Fecha:</strong> {log.timestamp}
            <strong>Usuario:</strong> {log.userName}
            <strong>Tipo de usuario:</strong> {log.userType}
            <strong>Acción:</strong> {log.action}
            <strong>ID del video:</strong> {log.videoID}
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
