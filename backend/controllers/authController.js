const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const { companyName, email, password, mobile } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create a new user
    const newUser = new User({ companyName, email, password, mobile });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
