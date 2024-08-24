import WebSocket from 'ws'

const WS_URL = process.env.SECRET_GYM_DASHBOARD_WS_URL
const TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function connectWebSocket() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${WS_URL}`, {
      headers: {
        Authorization: `${TOKEN}`,
        Upgrade: 'websocket',
        Connection: 'Upgrade',
      },
    })

    ws.on('open', () => {
      console.log('WebSocket connection established')
      resolve(ws)
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      reject(error)
    })
  })
}

export function handleWebSocketMessages(ws: any, callback: any) {
  ws.on('message', (data: any) => {
    const message = JSON.parse(data)
    callback(message)
  })
}
