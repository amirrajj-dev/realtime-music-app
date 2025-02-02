import express from 'express'
import { signUp , signIn, getToken , signOut } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/signup' , signUp)
router.post('/signin' , signIn)
router.post('/signout' , signOut)
router.get('/get-token' , getToken)

export default router;