const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');

// MIDDLEWARE: Check if the User has a valid ID Card (Token)
const verifyToken = (req, res, next) => {
  console.log("Verifying Token...");
  const token = req.headers['x-access-token'];
  
  if (!token) {
    console.log("No token found in headers!");
    return res.json({ status: 'error', error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = decoded;
    console.log("Token Valid. User ID:", req.user.userId);
    next();
  } catch (error) {
    console.log("Token Invalid:", error.message);
    res.json({ status: 'error', error: 'Invalid token' });
  }
};

// ADD LOG ROUTE
router.post('/', verifyToken, async (req, res) => {
  console.log("Received Log Request:", req.body);

  try {
    const newLog = await Log.create({
      userId: req.user.userId, // From the token
      category: req.body.category,
      type: req.body.type,
      amount: req.body.amount,
      co2: req.body.co2
    });
    
    console.log("Log Saved to DB:", newLog._id);
    res.json({ status: 'ok', log: newLog });
  } catch (error) {
    console.log("Database Save Error:", error.message);
    res.json({ status: 'error', error: error.message });
  }
});

// GET LOGS ROUTE
router.get('/', verifyToken, async (req, res) => {
  console.log("Fetching logs for user:", req.user.userId);
  try {
    const logs = await Log.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    console.log(`Found ${logs.length} logs.`);
    res.json({ status: 'ok', logs: logs });
  } catch (error) {
    console.log("Fetch Error:", error.message);
    res.json({ status: 'error', error: error.message });
  }
});

module.exports = router;