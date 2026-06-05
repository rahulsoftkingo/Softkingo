#!/bin/bash
cd /var/www/softkingo

echo "Starting Safe Auto Deploy..."

# 1. Discard local changes (KEEP images safe!)
echo "Cleaning local changes..."
git checkout -- next.config.mjs package-lock.json 2>/dev/null || true
git checkout -- . 2>/dev/null || true

# 2. Git pull (safe - images untouched)
echo "Pulling latest code..."
git pull origin main

# 3. Clean up Next.js cache to save disk space
echo "Cleaning old Next.js build cache..."
rm -rf .next/cache

# 4. Install dependencies and clean unused packages
echo "Installing dependencies and pruning old modules..."
npm install
npm prune

# 5. Fix security automatically
echo "Fixing security vulnerabilities..."
npm audit fix

# 6. Build production
echo "Building production..."
npm run build

# 7. Restart PM2
echo "Restarting PM2..."
pm2 restart softkingo

# 8. Check status
echo "Checking status..."
pm2 status

# 9. Show logs
echo "Last 10 logs:"
pm2 logs softkingo --lines 10

echo "DEPLOYMENT COMPLETE! Site LIVE!"
echo "URL: http://72.61.148.148:3000"
