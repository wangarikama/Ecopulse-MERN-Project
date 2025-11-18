const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 5000;
// --- MIDDLEWARE ---
app.use(express.json()); // Reads JSON from React
app.use(cors());         // Allows React to talk to Node

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// --- USE ROUTES ---
// This adds /register and /login to /api
app.use('/api', authRoutes); 

// This adds all log routes to /api/logs
app.use('/api/logs', logRoutes); 

// --- TEST ROUTE ---
app.get('/', (req, res) => {
  res.send('EcoPulse API is Running!');
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});