#!/bin/bash

echo "🚀 Setting up Skill Swap Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skill-swap
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start MongoDB: mongod"
echo "2. Run the application: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, check the README.md file" 