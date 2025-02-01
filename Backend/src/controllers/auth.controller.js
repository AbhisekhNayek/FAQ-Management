import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { config } from "../config/env.config.js";

// Sign Up Controller
export const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res
                .status(400)
                .json({ message: "Email already exists" });
    }

    // Admins can only assign roles to other admins
    if (role && role !== 'admin') {
      return res
              .status(400)
              .json({ message: "Invalid role." });
    }

    // Create user with default role 'user' 
    const user = new User({ email, password, role: role || 'user' });
    await user.save();

    res
        .status(201)
        .json({ message: "User registered successfully" });
  } catch (error) {
    res
        .status(500)
        .json({ message: "Server error", error: error.message });
  }
};



// Sign In Controller
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
                .status(401)
                .json({ message: "Invalid credentials" });
    }

    // Generate JWT token 
    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (error) {
    res
        .status(500)
        .json({ message: "Server error", error: error.message });
  }
};

