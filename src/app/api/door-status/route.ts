import { NextResponse } from 'next/server'
import { connectWebSocket, handleWebSocketMessages } from './websocketHandler'
import { wsMsgTypes } from '@/utils/dashboard/types'

let doorStatus = 'Cerrada'

export async function GET() {
  try {
    const ws = (await connectWebSocket()) as any
    let isStreamClosed = false

    const stream = new ReadableStream({
      start(controller) {
        handleWebSocketMessages(ws, (message: wsMsgTypes) => {
          if (isStreamClosed) return

          if (message.event === 'access.data.device.remote_unlock') {
            doorStatus = 'Abierta'
          } else if (message.event === 'access.data.device.update') {
            const resetConfig = message.data.configs.find(
              (config) => config.key === 'input_state_rly-lock_dry' && config.value === 'off',
            )
            if (resetConfig) {
              doorStatus = 'Cerrada'
            }
          }

          try {
            controller.enqueue(`data: ${JSON.stringify({ doorStatus })}\n\n`)
          } catch (error) {
            console.error('Error enqueueing data:', error)
            if (!isStreamClosed) {
              isStreamClosed = true
              controller.close()
              ws.close()
            }
          }
        })
      },
      cancel() {
        isStreamClosed = true
        ws.close()
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error connecting to WebSocket:', error)
    return NextResponse.json({ error: 'Failed to connect to WebSocket' }, { status: 500 })
  }
}
