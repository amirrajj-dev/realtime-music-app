import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getUsers , getUser } from '../controllers/user.controller.js';

const router = express.Router()

router.use(protectRoute)
router.get('/' , getUsers)
router.get('/curentuser' , getUser)

export default router;