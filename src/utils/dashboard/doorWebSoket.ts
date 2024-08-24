import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET'],
  },
})

io.on('connection', async (soket) => {
  console.log(soket.id)
})

httpServer.listen(5000, () => {
  console.log('is coneccted an listening')
})
