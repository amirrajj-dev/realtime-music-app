import express from 'express'
import {getAlbumById , getAlbums} from '../controllers/album.controller.js'
const router = express.Router()

//album routes

router.get('/' , getAlbums)
router.get('/:id', getAlbumById)

export default router;