import { usersModel } from "../models/user.model.js";

export const getUsers = async (req, res) =>{
    try {
        const currentUser = req.user
        //get all users except the current user
        const users = await usersModel.find({_id : {$ne : currentUser._id}})
        
        res.json({ data : users, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, error });
    }
}