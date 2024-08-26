'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/lib/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/lib/dialog'
import { getLogVideo } from '@/utils/dashboard/actions'
import { SkeletonLogVideo } from './SkeletonLogVideo'

export function LogsVideo({ videoID }) {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

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

  const handleVideoClick = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const blob = await getLogVideo(videoID)
      setVideoBlob(blob)
    } catch (error) {
      console.error('Error fetching video:', error)
      setError(error.message)
    } finally {
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleVideoClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'View Video'}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full bg-red-500">
        {error ? (
          <p>Error: {error}</p>
        ) : localVideoUrl ? (
          <video ref={videoRef} controls autoPlay muted>
            <source src={localVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          isLoading && <SkeletonLogVideo></SkeletonLogVideo>
        )}
      </DialogContent>
    </Dialog>
  )
}
