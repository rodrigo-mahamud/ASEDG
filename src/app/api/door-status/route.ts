import { NextResponse } from 'next/server'
import { connectWebSocket, handleWebSocketMessages } from './websocketHandler'

export async function GET() {
  try {
    const ws = await connectWebSocket()

    const stream = new ReadableStream({
      start(controller) {
        handleWebSocketMessages(ws, (message) => {
          controller.enqueue(JSON.stringify(message))
        })
      },
      cancel() {
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
