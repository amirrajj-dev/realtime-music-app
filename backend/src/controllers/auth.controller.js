import {usersModel} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
export const signUp = async (req, res) => {
    try {
        const {fullname, imageUrl , password , email} = req.body

        if (!fullname || !imageUrl || !password || !email){
            return res.status(400).json({message: 'Missing required fields' , success : false})
        }

        const isUserExist = await usersModel.findOne({fullname})
        if (isUserExist) {
            return res.status(400).json({message: 'User already exist' , success : false})
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email' , success : false})
        }

        if (password.length < 6){
            return res.status(400).json({message: 'Password should be at least 6 characters long' , success : false})
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        //generate the token
        const token = await jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        //set token in cookies
        res.cookie('music-app-token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        const newUser = await usersModel.create({fullname, imageUrl , password : hashedPassword , email})

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error
        })
    }
}