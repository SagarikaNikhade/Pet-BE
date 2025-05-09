const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const Userrouter = Router();

require("dotenv").config();

const secreatKey = process.env.secreatKey;

Userrouter.post("/signup", async (req, res) => {
  try {
    const { name, email, role, password, confirm_password } = req.body;
    
    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new UserModel({
      name,
      email,
      role,
      password: hash,
      confirm_password: hash,
    });
    
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
Userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    
    // Create token - IMPORTANT: Use userId here
    const token = jwt.sign({ userId: user._id }, process.env.secreatKey, {
      expiresIn: "7d",
    });
    
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  Userrouter,
};
