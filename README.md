EcoPulse - Carbon Footprint Tracker 🌍

EcoPulse is a full-stack MERN application designed to help individuals track their daily carbon emissions. Aligned with Climate Action, it visualizes the environmental impact of transport, energy, and food choices to promote sustainable living.

🚀 Live Demo

Frontend (Vercel): https://ecopulse-phi.vercel.app/

Backend (Render): https://ecopulse-xh2w.onrender.com

✨ Features

User Authentication: Secure Registration & Login (JWT & Bcrypt).

Dashboard: Real-time visualization of carbon data.

Activity Logging: Users can log activities (e.g., "10km Car Ride") and get instant CO2 calculations.

Data Persistence: All logs are stored securely in MongoDB.

Responsive Design: Fully functional on mobile and desktop with a "Cyber-Eco" aesthetic.

🛠️ Tech Stack

Frontend

React.js (Vite)

Tailwind CSS (Styling)

Axios (API Requests)

Lucide React (Icons)

Backend

Node.js & Express.js (REST API)

MongoDB & Mongoose (Database)

JsonWebToken (JWT) (Authentication)

⚙️ Installation & Setup

If you want to run this locally:

Clone the repository

git clone [https://github.com/wangarikama/Ecopulse-MERN-Project.git](https://github.com/wangarikama/Ecopulse-MERN-Project.git)


Install Dependencies

# Server
cd server
npm install

# Client
cd ../client
npm install


Environment Variables
Create a .env file in the server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run the App

# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
cd client
npm run dev


🎯 SDG Alignment

This project directly addresses Awareness-raising and human and institutional capacity on climate change mitigation. By making carbon data visible, EcoPulse turns abstract environmental concepts into actionable personal metrics.
