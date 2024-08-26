'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/lib/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/lib/dialog'
import { getLogVideo } from '@/utils/dashboard/actions'
import { SkeletonLogVideo } from './SkeletonLogVideo'
import { IconPlayerPlay, IconArrowLeft, IconArrowRight, IconDownload } from '@tabler/icons-react'

interface LogsVideoProps {
  videoID: string
  logs: any[]
  currentIndex: number
}

export function LogsVideo({ videoID, logs, currentIndex }: LogsVideoProps) {
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

  const fetchVideo = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const blob = await getLogVideo(id)
      const objectUrl = URL.createObjectURL(blob)
      setLocalVideoUrl(objectUrl)
    } catch (error) {
      console.error('Error fetching video:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoClick = () => {
    setIsDialogOpen(true)
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentVideoIndex - 1 : currentVideoIndex + 1
    if (newIndex >= 0 && newIndex < logs.length) {
      setCurrentVideoIndex(newIndex)
    }
  }

  const handleDownload = () => {
    if (localVideoUrl) {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = localVideoUrl
      a.download = `video_${logs[currentVideoIndex].videoID}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-10 w-10 p-1 rounded-md" onClick={handleVideoClick}>
          <IconPlayerPlay size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-max">
        {error ? (
          <p>Error: {error}</p>
        ) : isLoading ? (
          <SkeletonLogVideo />
        ) : localVideoUrl ? (
          <div className="flex flex-col items-center">
            <video ref={videoRef} controls autoPlay muted className="rounded-md mb-4">
              <source src={localVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex justify-between w-full">
              <Button onClick={() => handleNavigation('prev')} disabled={currentVideoIndex === 0}>
                <IconArrowLeft size={20} />
              </Button>
              <Button onClick={handleDownload}>
                <IconDownload size={20} />
              </Button>
              <Button
                onClick={() => handleNavigation('next')}
                disabled={currentVideoIndex === logs.length - 1}
              >
                <IconArrowRight size={20} />
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
