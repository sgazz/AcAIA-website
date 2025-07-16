#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory."
    read -p "Press Enter to exit..."
    exit 1
fi

echo "🚀 Starting AcAIA Frontend..."
echo "📍 Directory: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

echo "🔥 Starting Next.js development server..."
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔄 Auto-reload enabled with Next.js"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the frontend server
npm run dev 