@echo off
echo 🚀 Setting up Skill Swap Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 🔧 Creating .env file...
    (
        echo PORT=5000
        echo NODE_ENV=development
        echo MONGODB_URI=mongodb://localhost:27017/skill-swap
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
        echo JWT_EXPIRE=7d
        echo CORS_ORIGIN=http://localhost:3000
        echo RATE_LIMIT_WINDOW_MS=900000
        echo RATE_LIMIT_MAX_REQUESTS=100
    ) > .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install

cd ..

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Start MongoDB: mongod
echo 2. Run the application: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📚 For more information, check the README.md file
pause 