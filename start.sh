#!/bin/bash

echo "🤖 Starting EngageMate..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start the application
echo "📦 Starting containers..."
docker compose -f docker-compose.prod.yml up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ EngageMate is running!"
    echo "🌐 Open http://localhost:3000 in your browser"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to Settings tab and configure Reddit API"
    echo "2. Add your products in Products tab"
    echo "3. Start auto-commenting in Comments tab"
    echo ""
    echo "🛑 To stop: docker compose -f docker-compose.prod.yml down"
else
    echo "❌ Failed to start services. Check logs:"
    docker compose -f docker-compose.prod.yml logs
fi
