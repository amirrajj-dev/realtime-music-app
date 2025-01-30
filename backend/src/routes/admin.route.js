import express from 'express'
import {adminProtectRoute , protectRoute} from '../middlewares/auth.middleware.js'
import {addSong , deleteSong , addAlbum , deleteAlbum} from '../controllers/admin.controller.js'
 
const router = express.Router()

router.use(protectRoute)
router.use(adminProtectRoute)

// Admin routes

router.post('/add-song', addSong)
router.delete('/delete-song/:id', deleteSong)

router.post('/add-album', addAlbum)
router.delete('/delete-album/:id', deleteAlbum)

router.get('/check-admin' , checkAdmin)

export default router;