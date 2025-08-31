#!/bin/bash

# EngageMate Desktop App Launcher
# This script launches the desktop version of EngageMate

echo "🚀 Starting EngageMate Desktop App..."

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed. Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi

# Check if Tauri CLI is installed
if ! command -v cargo-tauri &> /dev/null; then
    echo "📦 Installing Tauri CLI..."
    source "$HOME/.cargo/env"
    cargo install tauri-cli
fi

# Start the database if not running
if ! docker ps | grep -q postgres; then
    echo "🗄️  Starting PostgreSQL database..."
    docker-compose up -d
    sleep 3
fi

# Push database schema
echo "📊 Setting up database..."
npx prisma db push

# Launch desktop app
echo "🖥️  Launching desktop app..."
source "$HOME/.cargo/env"
cargo tauri dev
