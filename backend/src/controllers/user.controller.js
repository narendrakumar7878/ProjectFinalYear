import httpStatus from "http-status";
import  User  from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt"
import Meeting from "../models/meeting.model.js"
import mongoose from "mongoose";

import crypto from "crypto";

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please enter both username and password" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        let isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid password" });
        }

    } catch (e) {
        return res.status(500).json({ message: `something went wrong ${e}` })
    }
}


const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: 'User created successfully' });
    } catch (error) {
        res.json({ message: `sommething went wrong ${error}` });
    }
}

const getUserHistory = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User found: ", user); // Log user object for debugging
        const meetings = await Meeting.find({ user_id: user._id });
        console.log("Meetings found: ", meetings); // Log meetings found
        res.json(meetings);
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` });
    }
}


const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;
    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newMeeting = new Meeting({
            user_id: user._id,  // Use _id instead of username
            meetingCode: meeting_code
        });

        // Log before saving
        console.log("New meeting to save: ", newMeeting);

        await newMeeting.save();

        // Log after saving
        console.log("Meeting saved successfully");

        res.status(httpStatus.CREATED).json({ message: 'Meeting added to history' });
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` });
    }
}

export { login, register, getUserHistory, addToHistory }
