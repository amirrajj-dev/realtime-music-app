import mongoose from 'mongoose'

export const connectToDb = async ()=>{
    try {
        if (mongoose.connections[0].readyState){
            console.log('already connected')
            return
        }
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('Connected to DB Succesfully 🎵💜')
        })
    } catch (error) {
        console.error('Error connecting to DB 🎵💜', error)
        process.exit(1)
    }
}