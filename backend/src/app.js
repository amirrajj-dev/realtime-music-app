import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import {connectToDb} from './utils/db.js'

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())

app.use('/api/users' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/admin' , adminRoutes)
app.use('/api/songs' , songRoutes)
app.use('/api/albums' , albumRoutes)
app.use('/api/stats' , statRoutes)

app.listen(port , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${port}`)
})