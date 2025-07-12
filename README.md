# SkillSwap - Skill Exchange Platform

A modern, mobile-first web application for exchanging skills between users. Built with React, Node.js, and MongoDB.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - User registration and login
  - Password change functionality
  - Protected routes

- **User Profiles**
  - Comprehensive profile management
  - Skills offered and wanted lists
  - Profile visibility toggle (public/private)
  - Location and availability settings
  - Rating and review system

- **Skill Exchange System**
  - Create and manage skill swap requests
  - Search for users with specific skills
  - Accept, reject, and complete swaps
  - Real-time messaging between users
  - Rating system for completed swaps

- **Search & Discovery**
  - Advanced search with filters (skill, location, level)
  - Popular skills suggestions
  - User recommendations
  - Location-based matching

- **Admin Panel**
  - Comprehensive dashboard with analytics
  - User management and moderation
  - Content moderation system
  - Platform health monitoring
  - Detailed analytics and reporting

### Technical Features
- **Mobile-First Design**
  - Responsive UI built with Tailwind CSS
  - Touch-friendly interface
  - Progressive Web App capabilities

- **Real-Time Updates**
  - React Query for data fetching and caching
  - Optimistic updates
  - Background data synchronization

- **Security**
  - JWT token authentication
  - Input validation and sanitization
  - Rate limiting
  - CORS protection

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **React Query** for state management
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hook Form** for forms
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **cors** for cross-origin requests
- **helmet** for security headers

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillSwap
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skillswap
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```

### Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Create database: `skillswap`

#### Option 2: MongoDB Atlas
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`

## 🚀 Quick Start

### Using Setup Scripts

#### Windows
```bash
# Run the Windows setup script
.\setup-windows.bat
```

#### Linux/Mac
```bash
# Make the script executable
chmod +x setup-linux.sh

# Run the Linux setup script
./setup-linux.sh
```

### Manual Setup
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## 📱 Usage

### For Users

1. **Registration & Login**
   - Create an account with email and password
   - Complete your profile with skills and preferences

2. **Profile Setup**
   - Add skills you can teach (offered skills)
   - Add skills you want to learn (wanted skills)
   - Set your location and availability
   - Choose profile visibility

3. **Finding Skills**
   - Use the search page to find users with skills you want
   - Filter by location, skill level, and other criteria
   - Browse popular skills for inspiration

4. **Skill Exchange**
   - Send swap requests to users
   - Accept or decline incoming requests
   - Communicate through the messaging system
   - Complete swaps and rate your experience

### For Administrators

1. **Dashboard Overview**
   - View platform statistics and metrics
   - Monitor user activity and growth
   - Check system health and performance

2. **User Management**
   - View all user accounts
   - Suspend or activate users
   - Monitor user behavior and reports

3. **Content Moderation**
   - Review flagged content and reports
   - Take action on inappropriate content
   - Manage user disputes

4. **Analytics**
   - View detailed platform analytics
   - Monitor user engagement metrics
   - Track skill popularity and trends

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search` - Search users
- `GET /api/users/:id` - Get specific user

### Skills
- `POST /api/users/skills/offered` - Add offered skill
- `POST /api/users/skills/wanted` - Add wanted skill
- `DELETE /api/users/skills/offered/:id` - Remove offered skill
- `DELETE /api/users/skills/wanted/:id` - Remove wanted skill

### Swaps
- `GET /api/swaps` - Get user swaps
- `POST /api/swaps` - Create swap request
- `GET /api/swaps/:id` - Get specific swap
- `PUT /api/swaps/:id/respond` - Respond to swap
- `PUT /api/swaps/:id/complete` - Complete swap
- `POST /api/swaps/:id/rate` - Rate swap
- `POST /api/swaps/:id/messages` - Send message

### Admin
- `GET /api/admin/stats` - Get platform stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/flagged-content` - Get flagged content
- `GET /api/admin/analytics` - Get analytics data
- `PUT /api/admin/users/:id/suspend` - Suspend user
- `PUT /api/admin/users/:id/activate` - Activate user
- `PUT /api/admin/reports/:id/resolve` - Resolve report

## 🎨 UI Components

The application includes a comprehensive set of reusable UI components:

- **Buttons**: Primary, secondary, success, danger variants
- **Forms**: Input fields, validation, error handling
- **Cards**: Content containers with headers and bodies
- **Modals**: Overlay dialogs for user interactions
- **Tables**: Data display with sorting and pagination
- **Alerts**: Success, error, warning, and info messages
- **Loading States**: Spinners and skeleton loaders
- **Navigation**: Responsive navigation with active states

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Security headers with helmet
- Protected API routes
- XSS and CSRF protection

## 📊 Performance Optimizations

- React Query for efficient data fetching
- Lazy loading of components
- Image optimization
- Code splitting
- Caching strategies
- Background data synchronization
- Optimistic updates

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Update API URL in environment variables
2. Build the application: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Following the repository
- Checking the changelog
- Reviewing release notes

---

**SkillSwap** - Connecting people through skill exchange! 🚀 