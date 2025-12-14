#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "--- Render Build Script Started ---"

# Set memory limit to prevent crashes
export NODE_OPTIONS="--max-old-space-size=8192"

# Install root dependencies (if any)
echo "--- Installing Root Dependencies ---"
npm install

# Go to frontend
echo "--- Installing Frontend Dependencies ---"
cd frontend
npm install --production=false --legacy-peer-deps

echo "--- Building Frontend ---"
# We run vite build directly to ensure we use the local installation
./node_modules/.bin/vite build

# Go back to root then backend
cd ..
echo "--- Installing Backend Dependencies ---"
cd backend
npm install --legacy-peer-deps

echo "--- Build Complete ---"
