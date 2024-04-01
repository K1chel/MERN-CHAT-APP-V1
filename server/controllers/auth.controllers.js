import validator from "validator";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken, hashPassword } from "../lib/utils.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateToken(user._id, res);

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(`Error in loginUser controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      return res
        .status(400)
        .json({ error: "User already exists. Try another email or username" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email adress" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "Account created successfully",
        token,
        user: newUser,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in registerUser controller: ${error.message}`.red.bold);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logoutUser controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getCurrentUser controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
