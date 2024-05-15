import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import menuroutes from './routes/menu_route.js'
import userroutes from './routes/user_route.js'
import orderroutes from './routes/order_routes.js'


connectDB()
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/menu', menuroutes);
app.use('/api/user', userroutes);
app.use('/api/orders', orderroutes)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

