'use client'

import { useState, useEffect } from 'react'
import { Badge } from '../lib/badge'
import { IconExclamationCircle, IconLockCheck } from '@tabler/icons-react'

export default function SDDoorStatus() {
  const [doorStatus, setDoorStatus] = useState('Cerrada')

  useEffect(() => {
    const eventSource = new EventSource('/api/door-status')
    eventSource.onmessage = (event) => {
      try {
        const { doorStatus } = JSON.parse(event.data)
        setDoorStatus(doorStatus)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
    eventSource.onerror = (error) => {
      console.error('EventSource error:', error)
      eventSource.close()
    }
    return () => {
      console.log('Closing connection')
      eventSource.close()
    }
  }, [])
  const variant = () => {
    if (doorStatus === 'Cerrada') {
      return 'outlineGreen'
    } else {
      return 'outlineYellow'
    }
  }
  return (
    <Badge
      variant={variant()}
      className="rounded-md text-base flex items-center gap-2 w-fit h-fit py-3 px-4"
    >
      {doorStatus === 'Cerrada' ? (
        <IconLockCheck size={18} stroke={1.5}></IconLockCheck>
      ) : (
        <IconExclamationCircle size={18} stroke={1.75}></IconExclamationCircle>
      )}
      <span>Puerta {doorStatus}</span>
    </Badge>
  )
}
