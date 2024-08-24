'use client'

import { useState, useEffect } from 'react'

export default function SDDoorStatus() {
  const [doorStatus, setDoorStatus] = useState('Unknown')

  useEffect(() => {
    const eventSource = new EventSource(`/api/door-status`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.event === 'access.remote_view') {
        setDoorStatus('Doorbell ringing')
      } else if (data.event === 'access.remote_view.change') {
        if (data.data.reason_code === 107) {
          setDoorStatus('Door unlocked')
        } else if (data.data.reason_code === 108) {
          setDoorStatus('Doorbell canceled')
        }
      } else if (data.event === 'access.data.device.remote_unlock') {
        setDoorStatus('Door remotely unlocked')
      }
    }

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      <h2>Door Status</h2>
      <p>{doorStatus}</p>
    </div>
  )
}
