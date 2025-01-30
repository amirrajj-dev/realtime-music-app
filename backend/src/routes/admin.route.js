import express from 'express'
import {adminProtectRoute , protectRoute} from '../middlewares/auth.middleware.js'
import {addSong , deleteSong} from '../controllers/admin.controller.js'
 
const router = express.Router()

router.use(protectRoute)
router.use(adminProtectRoute)

// Admin routes

router.post('/add-song', addSong)
router.delete('/delete-song/:id', deleteSong)

export default router;