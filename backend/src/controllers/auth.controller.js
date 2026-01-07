import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util.js";

export const registerUser = async (req, res, body) => {
    try {
        const { name, email, password } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !name.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exist try to login" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const loginUser = async (res, req) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || !email.trim() || !password.trim()) {
            return res
                .status(400)
                .json({ message: "Email and Password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateToken({
            userId: user._id,
            email: user.email,
        });

        return res
            .status(200)
            .json({ message: "User Logged In Successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getLoggedInUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = User.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res
            .status(200)
            .json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
