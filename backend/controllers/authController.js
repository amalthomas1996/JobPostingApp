const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  try {
    const { companyName, email, password, mobile } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ companyName, email, password: hashedPassword, mobile });

    // Send verification email (simplified)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify your email',
      text: 'Please verify your email by clicking on the following link: ...'
    };
    transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered. Verification email sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
