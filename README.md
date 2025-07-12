# 🎯 SkillHub – Connect, Learn, and Grow Together

<div align="center">

![SkillHub Logo](https://img.shields.io/badge/SkillHub-Peer%20Learning%20Platform-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.15.1-47A248?style=for-the-badge&logo=mongodb)

**A modern peer-to-peer learning platform that connects learners worldwide**
--kunjalbavala@gmail.com

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📸 Screenshots](#-screenshots)
- [🏗️ Project Structure](#️-project-structure)
- [🔧 Configuration](#-configuration)
- [📱 Usage Guide](#-usage-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 **Core Functionality**
- **👤 User Profiles** – Create detailed profiles with skills, bio, availability, and profile pictures
- **🧠 Skill Management** – Add/remove skills you can teach or want to learn with an intuitive interface
- **🛒 Skill Marketplace** – Discover and connect with learners offering the skills you need
- **💡 Smart Matching** – AI-powered suggestions for perfect learning partners
- **📅 Meeting Scheduling** – Schedule learning sessions with peers without any payment requirements
- **🔗 Peer Learning** – Connect with learning partners and organize study sessions

### 🎨 **User Experience**
- **📱 Responsive Design** – Beautiful interface that works on desktop, tablet, and mobile
- **⚡ Modern UI/UX** – Clean, professional design with smooth animations and hover effects
- **🎨 Gradient Design** – Beautiful color schemes and modern visual elements
- **🔒 Secure Authentication** – User registration and login system
- **📊 Real-time Updates** – Live notifications and status updates

### 🚀 **Technical Features**
- **⚡ Fast Performance** – Built with React and optimized for speed
- **🔧 RESTful API** – Clean, well-documented backend API
- **🗄️ MongoDB Database** – Scalable data storage with Mongoose ODM
- **🛡️ Error Handling** – Comprehensive error handling and user feedback
- **📝 Form Validation** – Client and server-side validation

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React.js | 19.1.0 |
| **Build Tool** | Vite | 6.3.5 |
| **Styling** | CSS3 + Inline Styles | - |
| **Backend** | Node.js | 18+ |
| **Framework** | Express.js | 5.1.0 |
| **Database** | MongoDB | 8.15.1 |
| **ODM** | Mongoose | 8.15.1 |
| **Authentication** | JWT | 9.0.2 |
| **File Upload** | Multer | 2.0.0 |
| **HTTP Client** | Axios | 1.9.0 |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skillhub.git
   cd skillhub
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the server directory, create a .env file
   cd ../server
   echo "MONGO_URI=your_mongodb_connection_string" > .env
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🏗️ Project Structure

```
skillhub/
├── 📁 client/                 # Frontend React application
│   ├── 📁 public/            # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI components
│   │   │   ├── SkillForm.jsx
│   │   │   └── ProfileForm.jsx
│   │   ├── 📁 pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PeerLearning.jsx
│   │   │   ├── Matches.jsx
│   │   │   └── SkillMatchPage.jsx
│   │   ├── 📁 services/      # API services
│   │   ├── 📁 assets/        # Images and static files
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
├── 📁 server/                 # Backend Node.js application
│   ├── 📁 routes/            # API routes
│   │   └── userRoutes.js
│   ├── 📁 models/            # Database models
│   │   └── User.js
│   ├── 📁 controllers/       # Business logic
│   ├── server.js             # Main server file
│   └── package.json
├── 📄 README.md
└── 📄 .gitignore
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillhub

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here
```

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `your_mongodb_connection_string` in `.env`

#### Option 2: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/skillhub`

---

## 📱 Usage Guide

### 👤 Getting Started

1. **Create an Account**
   - Visit the login page
   - Click "Create one now" to register
   - Fill in your details and create your account

2. **Complete Your Profile**
   - Add your skills (what you can teach)
   - Add skills you want to learn
   - Upload a profile picture
   - Set your availability schedule

3. **Explore the Platform**
   - Browse the marketplace for skills
   - Check out smart matches
   - Connect with learning partners

### 🛒 Using the Marketplace

1. **Add Your Skills**
   - Go to the marketplace
   - Add skills you can teach
   - Add skills you want to learn
   - Save your changes

2. **Find Learning Partners**
   - Browse available users
   - Filter by skills or interests
   - View user profiles and ratings

### 💡 Smart Matching

1. **View Matches**
   - Check the matches page for suggestions
   - See match scores and compatibility
   - Review user skills and availability

2. **Connect with Peers**
   - Click "View Profile" to see details
   - Send connection requests
   - Request skill swaps

### 🔗 Peer Learning

1. **Schedule Sessions**
   - Browse available peers
   - Click "Schedule Meeting"
   - Choose date, time, and duration
   - Specify topics to cover

2. **Organize Study Groups**
   - Create learning sessions
   - Set meeting agendas
   - Track progress and goals

---

