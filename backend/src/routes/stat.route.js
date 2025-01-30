import express from 'express'
import { getAllStats } from '../controllers/stat.controller.js';
import {adminProtectRoute , protectRoute} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/' , protectRoute , adminProtectRoute , getAllStats)

export default router;