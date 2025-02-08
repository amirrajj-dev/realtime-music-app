import { usersModel } from "../models/user.model.js";
import {messagesModel} from '../models/message.model.js'
export const getUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    //get all users except the current user
    const users = await usersModel.find(
      { _id: { $ne: currentUser._id } },
      "email , fullname"
    );

    res.json({ data: users, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    const currentUser = {
      fullname: user.fullname,
      email: user.email,
      id: user._id,
      createdAt: user.createdAt,
    };
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    return res.status(200).json({
      data: currentUser,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const currentUser = req.user;
    const { userId } = req.params;
    const user = await usersModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const messages = await messagesModel.find({
      $or: [
        { senderId: currentUser._id, receiverId: userId },
        { senderId: userId, receiverId: currentUser._id },
      ],
    }).sort({_id : 1})
console.log(messages);
    return res.status(200).json({
      data : messages,
      success : true
  }) 

  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};
