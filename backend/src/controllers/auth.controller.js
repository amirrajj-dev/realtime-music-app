import { usersModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
export const signUp = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    if (!fullname || !password || !email) {
      return res
      .status(400)
      .json({ message: "Missing required fields", success: false });
    }
    const isUserExist = await usersModel.findOne({ fullname });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exist", success: false });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters long",
        success: false,
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usersModel.create({
      fullname,
      password: hashedPassword,
      email,
    });

    //generate the token
    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //set token in cookies
    res.cookie("music-app-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    //generate the token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //set token in cookies
    res.cookie("music-app-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      message : 'signed in succesfully',
      success : true,
      data : user
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

export const signOut = async (req, res) => {
  console.log('yes');
  try {
    console.log(res.cookie['music-app-token']);
    res.cookie('music-app-token' , '' , {
      expires : new Date(0),
      maxAge : 0
  })
    return res.json({ message: "User signed out successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
}

export const getToken = async (req, res) => {
  try {
    const token = req.cookies["music-app-token"];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    return res.status(200).json({
      message: "Token is available",
      success: true,
      token,
    });
  } catch (error) {}
};