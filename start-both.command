#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -f "package.json" ]; then
    echo "❌ Error: Project structure not found!"
    echo "Please run this script from the project root directory."
    read -p "Press Enter to exit..."
    exit 1
fi

echo "🚀 Starting AcAIA Full Stack Development Environment..."
echo "📍 Directory: $(pwd)"
echo ""

# Function to install dependencies if needed
install_dependencies() {
    local dir=$1
    local name=$2
    
    if [ ! -d "$dir/node_modules" ]; then
        echo "📦 Installing $name dependencies..."
        cd "$dir"
        npm install
        cd ..
        echo ""
    fi
}

# Install dependencies for both frontend and backend
install_dependencies "." "frontend"
install_dependencies "backend" "backend"

# Check for .env file in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found!"
    echo "Please create a .env file based on backend/env.example"
    echo ""
fi

echo "🔥 Starting both servers..."
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend:  http://localhost:5001"
echo "🔄 Auto-reload enabled for both servers"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers in parallel using background processes
echo "Starting backend server (port 5001)..."
cd backend
PORT=5001 npm run dev &
BACKEND_PID=$!
cd ..

echo "Starting frontend server (port 3000)..."
npm run dev &
FRONTEND_PID=$!

# Otvori browser na frontend adresi (MacOS open, Linux xdg-open, Windows start)
( sleep 2 && ( open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null || start http://localhost:3000 2>/dev/null ) ) &

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 