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

    // Agregar un registro para todos los mensajes recibidos
    ws.on('message', (data) => {
      console.log('WebSocket message received:', data.toString())
    })
  })
}

export function handleWebSocketMessages(ws, callback) {
  ws.on('message', (data) => {
    const message = JSON.parse(data)
    console.log('Parsed WebSocket message:', message)
    callback(message)
  })
}
