# 🌍 Ecopulse - Carbon Footprint Tracking Application

A full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users track and manage their personal carbon footprint across multiple categories including transportation, energy, and food consumption.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Ecopulse is an environmental awareness platform that empowers users to understand and reduce their carbon footprint. By logging daily activities in categories like transportation, energy consumption, and food choices, users gain insights into their environmental impact and receive actionable recommendations for sustainable living.

## ✨ Features

### User Management
- **User Registration**: Create new user accounts with email and password
- **User Authentication**: Secure login system using JWT (JSON Web Tokens)
- **Password Security**: Passwords are hashed using bcryptjs
- **User Profiles**: Track user information with timestamps

### Carbon Logging
- **Multi-Category Tracking**: Log activities across three main categories:
  - 🚗 **Transportation** (cars, buses, bicycles, etc.)
  - ⚡ **Energy** (electricity, gas, renewable energy)
  - 🍖 **Food** (meat, vegetables, dairy, etc.)
- **Automatic CO2 Calculation**: System automatically calculates carbon emissions based on activity type and amount
- **Activity History**: View and track all logged activities with timestamps

### Dashboard
- **Summary Statistics**: View overall carbon footprint metrics
- **Visual Analytics**: Data visualization of emissions by category
- **Activity Timeline**: Track activities over time

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.0) - UI library with React Hooks
- **Vite** (v7.2.2) - Fast build tool and dev server
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **Axios** (v1.13.2) - HTTP client for API calls
- **React Router DOM** (v7.9.6) - Client-side routing
- **Lucide React** (v0.554.0) - Icon library
- **ESLint** - Code quality and linting

### Backend
- **Node.js** - JavaScript runtime
- **Express** (v5.1.0) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.20.0) - MongoDB ODM
- **JWT** (jsonwebtoken v9.0.2) - Authentication tokens
- **bcryptjs** (v3.0.3) - Password hashing
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **dotenv** (v17.2.3) - Environment variable management
- **Nodemon** (v3.1.11) - Development server with auto-reload

## 📁 Project Structure

```
Ecopulse-MERN-Project/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images and media files
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main dashboard page
│   │   │   ├── Login.jsx            # User login page
│   │   │   └── Register.jsx         # User registration page
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # App styles
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # React entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS configuration
│   └── eslint.config.js             # ESLint rules
│
├── server/                          # Express backend
│   ├── models/
│   │   ├── User.js                  # User database model
│   │   └── Log.js                   # Carbon log database model
│   ├── routes/
│   │   ├── auth.js                  # Authentication endpoints
│   │   └── logs.js                  # Carbon logging endpoints
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Environment variables (not in repo)
│
└── README.md                        # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - Database (local or MongoDB Atlas) - [Download](https://www.mongodb.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/wangarikama/Ecopulse-MERN-Project.git
cd Ecopulse-MERN-Project
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Setup

Create a `.env` file in the `server` directory with the following environment variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/ecopulse
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecopulse

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Optional: CORS Origins
CORS_ORIGIN=http://localhost:5173
```

**Important Environment Variables:**
- `MONGO_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for JWT token generation (use a strong, random string)
- `PORT`: Port number for the Express server (default: 5000)

### Frontend Setup (Optional)

If needed, create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1: Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000` and use Nodemon for automatic reloading on file changes.

#### Terminal 2: Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will typically start on `http://localhost:5173`.

### Production Build

#### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized build in the `dist/` folder.

#### Run Backend in Production

```bash
cd server
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/register` | Register a new user | `{ name, email, password }` |
| POST | `/login` | Login user | `{ email, password }` |

**Response Format:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@email.com"
  }
}
```

### Carbon Logging Routes (`/api/logs`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/` | Get all logs for user | ✅ |
| POST | `/` | Create a new log | ✅ |
| GET | `/:id` | Get specific log | ✅ |
| PUT | `/:id` | Update a log | ✅ |
| DELETE | `/:id` | Delete a log | ✅ |

**Log Creation Request:**
```json
{
  "category": "transport",
  "type": "car",
  "amount": 50,
  "co2": 25.5
}
```

## 💾 Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: current date)
}
```

### Log Model (Carbon Footprint Entry)

```javascript
{
  userId: ObjectId (reference to User, required),
  category: String (required) // "transport", "energy", "food"
  type: String (required),    // "car", "bus", "beef", etc.
  amount: Number (required),  // quantity (km, kWh, kg, etc.)
  co2: Number (required),     // CO2 equivalent in kg
  createdAt: Date (default: current date)
}
```

## 🏗️ Project Architecture

### Frontend Architecture

- **Component-Based**: React components for reusability
- **Routing**: React Router for multi-page navigation
- **State Management**: React Hooks (useState, useEffect)
- **API Communication**: Axios for HTTP requests
- **Styling**: Tailwind CSS for responsive design

### Backend Architecture

- **MVC Pattern**: Models, Routes, and Controllers
- **RESTful API**: Standard HTTP methods
- **Authentication**: JWT-based token authentication
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS and JSON parsing

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- Verify the `MONGO_URI` in your `.env` file

### Port Already in Use
- Change the `PORT` in `.env` or kill the process using the port:
  ```bash
  lsof -i :5000  # Find process
  kill -9 <PID>   # Kill process
  ```

### CORS Errors
- Check the `CORS_ORIGIN` in backend `.env`
- Ensure frontend and backend are on correct ports

## 📧 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy tracking! 🌱 Let's reduce our carbon footprint together.**