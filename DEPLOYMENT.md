# 🚀 Render.com Deployment Guide

This guide explains how to automatically deploy your Boonafide application to Render.com using GitHub Actions.

## 📋 Prerequisites

1. **Render.com account** - [Sign up here](https://render.com)
2. **MongoDB database** - Use MongoDB Atlas (free tier available)
3. **GitHub repository** with your code
4. **Render.com Web Service** already created and connected to your repo

## 🏗️ Initial Setup

### 1. Create Render.com Web Service

1. Go to [Render.com Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Render will automatically detect your `Dockerfile`
5. Set environment variables:
   - `NODE_ENV`: production
   - `DBURL`: Your MongoDB connection string
   - `CLOUDINARY_KEY`: Your Cloudinary API key
   - `CLOUDINARY_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_SECRET`: Your Cloudinary API secret

### 2. Configure Auto-Deploy

In your Render.com service settings:
- ✅ **Auto-Deploy**: Enabled
- ✅ **Branch**: `master` (or your main branch)
- ✅ **Build Command**: Auto-detected from Dockerfile
- ✅ **Start Command**: Auto-detected from Dockerfile

## 🚀 Automatic Deployment Workflow

### How It Works

1. **Push a tag** (e.g., `v1.0.0`)
2. **GitHub Actions** automatically triggers
3. **Render.com** detects the new commit and redeploys
4. **Your app** is automatically updated

### Deploy Automatically

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will automatically trigger deployment to Render.com! 🎉
```

### Alternative: Create a GitHub Release

1. Go to your repository → **Releases** → **Create a new release**
2. Choose a tag or create a new one
3. Publish the release
4. **Automatic deployment to Render.com** 🚀

## 📝 Version Management

### Release Workflow

```bash
# 1. Update package.json version
# Change "version": "1.0.2" to "version": "1.0.3"

# 2. Commit version change
git add package.json
git commit -m "release: v1.0.3"
git push origin master

# 3. Create and push tag
git tag v1.0.3
git push origin v1.0.3

# 4. GitHub Actions automatically triggers deployment! 🚀
```

### Version Naming Convention

- Use **semantic versioning**: `MAJOR.MINOR.PATCH`
- Examples: `v1.0.0`, `v1.2.3`, `v2.0.0`
- **Tag must start with `v`** to trigger deployment

## 🔧 Manual Deployment

If you need to deploy manually:

1. Go to your Render.com dashboard
2. Find your service
3. Click **"Manual Deploy"**
4. Select the branch/commit to deploy

## 🌐 Service URLs

After deployment, you'll get:
- **Full Application**: `https://boonafide.onrender.com` (both frontend and backend)

## 🎯 Quick Deploy Commands

```bash
# Deploy version 1.0.0
git tag v1.0.0
git push origin v1.0.0

# Deploy version 1.0.1
git tag v1.0.1
git push origin v1.0.1

# Deploy version 2.0.0
git tag v2.0.0
git push origin v2.0.0
```

**That's it! Every time you push a tag, your app automatically deploys to Render.com! 🚀**
