import express from 'express'
import {adminProtectRoute , protectRoute} from '../middlewares/auth.middleware.js'
import {addSong} from '../controllers/admin.controller.js'
 
const router = express.Router()

router.use(protectRoute)
router.use(adminProtectRoute)

// Admin routes

router.post('/add-song', addSong)

export default router;