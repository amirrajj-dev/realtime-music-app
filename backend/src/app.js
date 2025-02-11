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
import { createServer } from 'http'
import { initializeSocket } from './utils/socket.js'
import cron from 'node-cron'
import fs from "fs"

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())

const httpServer = createServer(app)
initializeSocket(httpServer)

app.use(cors({
    origin: '*', // allow http requests from anywhere
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

const tmpDir = path.join(process.cwd(), 'tmp')
//every one hour deletes the tmp folder thass why we use node-cron its a cron job
cron.schedule("0 * * * *" , ()=>{
    fs.readdir(tmpDir, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            fs.unlink(path.join(tmpDir, file), err => {
                if (err) {
                    throw err;
                }
            });
        });
    });
})

app.use('/api/users' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/admin' , adminRoutes)
app.use('/api/songs' , songRoutes)
app.use('/api/albums' , albumRoutes)
app.use('/api/stats' , statRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(dirname , '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirname, '../frontend/dist/index.html'))
    })
}

httpServer.listen(port , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${port}`)
})