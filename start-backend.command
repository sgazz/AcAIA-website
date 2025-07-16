#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    echo "Please run this script from the project root directory."
    read -p "Press Enter to exit..."
    exit 1
fi

echo "🚀 Starting AcAIA Backend..."
echo "📍 Directory: $(pwd)/backend"
echo ""

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file based on env.example"
    echo ""
fi

echo "🔥 Starting backend server in development mode..."
echo "📡 Server will be available at: http://localhost:3001"
echo "🔄 Auto-reload enabled with nodemon"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the backend server
npm run dev 