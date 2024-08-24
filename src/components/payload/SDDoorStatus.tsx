'use client'

import { useState, useEffect } from 'react'

export default function SDDoorStatus() {
  const [doorStatus, setDoorStatus] = useState('Cerrada')

  useEffect(() => {
    const eventSource = new EventSource('/api/door-status')

    eventSource.onopen = () => {
      console.log('SSE connection opened')
    }

    eventSource.onmessage = (event) => {
      console.log('Received SSE message:', event.data)
      try {
        const message = JSON.parse(event.data)
        console.log('Parsed SSE message:', message)

        // Manejar eventos específicos
        if (message.event === 'access.data.device.remote_unlock') {
          setDoorStatus('Abierta')
        } else if (message.event === 'access.data.device.update') {
          // Comprobar si el mensaje contiene la configuración específica
          const resetConfig = message.data.configs.find(
            (config) => config.key === 'input_state_rly-lock_dry' && config.value === 'off',
          )
          if (resetConfig) {
            setDoorStatus('Cerrada')
          }
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error)
      eventSource.close()
    }

    return () => {
      console.log('Closing SSE connection')
      eventSource.close()
    }
  }, [])

  return (
    <div>
      <h2>Door Status</h2>
      <p>Current status: {doorStatus}</p>
    </div>
  )
}
