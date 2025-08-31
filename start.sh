#!/bin/bash

echo "🤖 Starting EngageMate Desktop App..."

# Check if Node.js is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Initialize SQLite database
echo "📊 Setting up SQLite database..."
npx prisma db push

# Launch desktop app
echo "🖥️  Launching desktop app..."
./start-desktop.sh
