#!/bin/bash
set -e

echo "🏗️  Building KAWS CAR for Vercel..."

# Build frontend
cd frontend
echo "📦 Installing frontend dependencies..."
yarn install --frozen-lockfile

echo "🔨 Building React app..."
yarn build

echo "✅ Build completed successfully!"
