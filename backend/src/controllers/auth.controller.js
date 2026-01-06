import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist try to login" });
    }

    if (
      !name ||
      !email ||
      !password ||
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.json({ message: "All fields are required" });
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
