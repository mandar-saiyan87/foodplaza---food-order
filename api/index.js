import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import menuroutes from './routes/menu_route.js'
import userroutes from './routes/user_route.js'
import orderroutes from './routes/order_routes.js'
import dns from 'dns'
import http from 'http'
import { initSocket } from './socket.js'
import startN8nHeartBeat from './utils/n8nconnection.js'
import dotenv from 'dotenv';

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4'])

connectDB()
const app = express()
const port = 5000

const server = http.createServer(app)
initSocket(server)

app.use(express.json())
app.use(cors())


//Routes
app.use('/api/menu', menuroutes);
app.use('/api/user', userroutes);
app.use('/api/orders', orderroutes)

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)

  if (process.env.N8N_WEBHOOK_URL_PROD) {
    startN8nHeartBeat()
  }
})


