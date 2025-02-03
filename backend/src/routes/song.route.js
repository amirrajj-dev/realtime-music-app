import express from 'express'
import {getSongs , getFeaturedSongs , getMadeForYouSongs , getTrendingSongs} from '../controllers/song.controller.js'
import {adminProtectRoute , protectRoute} from '../middlewares/auth.middleware.js'
const router = express.Router()

router.get('/' , protectRoute , adminProtectRoute , getSongs)
router.get('/featured-songs' , getFeaturedSongs)
router.get('/made-for-you-songs' , getMadeForYouSongs)
router.get('/trending-songs' , getTrendingSongs)

export default router;