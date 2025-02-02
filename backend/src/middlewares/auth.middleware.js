import {usersModel} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies['music-app-token'];
        if (!token) {
            return res.status(401).json({ message: 'You are not authorized to access this route or resource.' , success : false });
        }
        const payload = await jwt.verify(token , process.env.JWT_SECRET)
        const user = await usersModel.findById(payload._id)
        if (!user) {
            return res.status(401).json({ message: 'Token is invalid.' , success : false });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid.' , success : false });
    }
}

export const adminProtectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies['music-app-token'];
        if (!token) {
            return res.status(401).json({ message: 'You are not authorized to access this route or resource.' , success : false });
        }
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await usersModel.findById(payload._id)
        if (!user) {
            return res.status(401).json({ message: 'You are not authorized to access this route or resource.' , success : false });
        }
        if(user.email !== process.env.ADMIN_EMAIL){
            return res.status(403).json({ message: 'You are not an admin.' , success : false });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid.', success : false });
    }
}