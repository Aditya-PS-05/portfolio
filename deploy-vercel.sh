#!/bin/bash

# Vercel Deployment Script for adityaps.work
echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to project directory
cd "$(dirname "$0")"

# Build the site
echo "📦 Building Jekyll site..."
bundle install
bundle exec jekyll build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "🌐 Your site will be available at: https://adityaps.work"
echo ""
echo "📋 Next steps:"
echo "1. Configure custom domain in Vercel dashboard"
echo "2. Update DNS records at your domain registrar"
echo "3. Wait for DNS propagation (24-48 hours)"
echo ""
echo "🔧 Vercel CLI commands for future:"
echo "  vercel --prod     # Deploy to production"
echo "  vercel logs        # View deployment logs"
echo "  vercel env ls      # List environment variables"