import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import {connectToDb} from './utils/db.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}))

const dirname = path.resolve()
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(dirname , 'tmp'),  // path where files will be temporarily stored before moving them to the destination directory.
    createParentPath: true,  // create parent directory if it doesn't exist.
    limits: { fileSize: 15 * 1024 * 1024 },  // 15 MB file size limit.
    abortOnLimit: true,  // abort the request if the file size exceeds the limit.
    preserveExtension: true,  // keep original file extension.
}))

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