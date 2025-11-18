const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER NEW USER
router.post('/register', async (req, res) => {
  try {
    console.log("Registering user:", req.body.email);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log("User created:", user._id);
    res.json({ status: 'ok', userId: user._id });
  } catch (err) {
    console.log("Register Error:", err.message);
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

// LOGIN (DEBUG VERSION)
router.post('/login', async (req, res) => {
  console.log("Login attempt for:", req.body.email);
  
  try {
    const { email, password } = req.body;
    
    // 1. Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User NOT found in database.");
      return res.json({ status: 'error', error: 'Invalid email' });
    }
    console.log("User found in DB.");

    // 2. Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isPasswordValid);

    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: user._id, name: user.name }, 
        process.env.JWT_SECRET || 'secret123'
      );
      return res.json({ status: 'ok', token: token, name: user.name });
    } else {
      console.log("Password was incorrect.");
      return res.json({ status: 'error', user: false });
    }
  } catch (err) {
    console.log("Server Error:", err);
    res.json({ status: 'error', error: 'Login failed' });
  }
});

module.exports = router;