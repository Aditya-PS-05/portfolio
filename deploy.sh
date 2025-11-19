#!/bin/bash

# Deployment Script for adityaps.work
echo "🚀 Starting deployment for adityaps.work..."

# Build the site
echo "📦 Building Jekyll site..."
bundle exec jekyll build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Site built in _site directory"
else
    echo "❌ Build failed!"
    exit 1
fi

# Git operations
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update site - $(date)"
git push origin main

echo "🎉 Deployment complete!"
echo "🌐 Your site will be available at: https://adityaps.work"
echo ""
echo "📋 Next steps:"
echo "1. Configure DNS settings at your domain registrar"
echo "2. Add CNAME record: @ -> aditya-PS-05.github.io (for GitHub Pages)"
echo "3. Or use deployment platform (Netlify/Vercel/Cloudflare)"
echo ""
echo "⏱️ DNS propagation may take 24-48 hours"