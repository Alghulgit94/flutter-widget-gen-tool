#!/bin/bash

# Flutter Component Generator - Deployment Commands
# Run this script to prepare for deployment

echo "🚀 Flutter Component Generator - Deployment Helper"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Current project status:"
echo "-------------------------"

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes"
    git status -s
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Enter commit message: " commit_msg
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo "🔗 Next steps:"
echo "-------------"
echo "1. Create a GitHub repository at: https://github.com/new"
echo "2. Copy your repository URL"
echo ""
read -p "Paste your GitHub repository URL: " repo_url

if [[ -n "$repo_url" ]]; then
    # Check if remote already exists
    if git remote | grep -q origin; then
        echo "⚠️  Remote 'origin' already exists"
        read -p "Do you want to update it? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git remote set-url origin "$repo_url"
            echo "✅ Remote updated"
        fi
    else
        git remote add origin "$repo_url"
        echo "✅ Remote added"
    fi

    echo ""
    read -p "Do you want to push to GitHub now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Pushing to GitHub..."
        git push -u origin main
        echo "✅ Pushed to GitHub!"
        echo ""
        echo "🎉 Success! Your code is now on GitHub"
        echo ""
        echo "📝 Next: Deploy to Vercel"
        echo "-------------------------"
        echo "1. Go to: https://vercel.com/new"
        echo "2. Import your GitHub repository"
        echo "3. Add environment variables:"
        echo "   - DATABASE_URL=<your-cockroachdb-url>"
        echo "   - JWT_SECRET=<generate-new-secret>"
        echo "   - NODE_ENV=production"
        echo "4. Click Deploy"
        echo "5. After deploy, visit: https://your-app.vercel.app/api/setup"
        echo ""
        echo "📚 For detailed instructions, see DEPLOYMENT.md"
    fi
else
    echo "⚠️  No repository URL provided"
    echo "You can manually add it later with:"
    echo "  git remote add origin <your-repo-url>"
    echo "  git push -u origin main"
fi

echo ""
echo "✅ Done!"
echo ""
echo "📚 Documentation files:"
echo "  - QUICK_START.md - Fast setup guide"
echo "  - DEPLOYMENT.md - Detailed deployment guide"
echo "  - DEPLOYMENT_SUMMARY.md - What was done"
echo "  - PRE_DEPLOYMENT_CHECKLIST.md - Pre-flight checks"
echo ""
