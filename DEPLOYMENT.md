# 🚀 Full-Stack Vercel Deployment Guide

This guide will help you deploy your **Boonafide full-stack application** (React client + Node.js backend) to Vercel with automated deployments triggered by Git tags.

## 📋 Prerequisites

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Have a Vercel account** - [Sign up here](https://vercel.com/signup)

## 🛠️ Initial Setup

### 1. Login to Vercel
```bash
vercel login
```

### 2. Initialize Vercel Project (from root directory)
```bash
vercel
```

Follow the prompts to set up your project. Make sure to:
- Set the root directory to `./` (root of your project)
- Choose "Other" as the framework
- The build command will be handled by our custom configuration

### 3. Get Your Project Details

You'll need these values for GitHub Actions:

- **VERCEL_TOKEN**: Found in your Vercel account settings → Tokens
- **VERCEL_ORG_ID**: Found in your Vercel account settings → General → Team ID
- **VERCEL_PROJECT_ID**: Found in your project settings → General → Project ID

## 🔐 GitHub Secrets Setup

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

1. `VERCEL_TOKEN` - Your Vercel authentication token
2. `VERCEL_ORG_ID` - Your Vercel organization ID  
3. `VERCEL_PROJECT_ID` - Your Vercel project ID

## 🏗️ Project Structure

Your project will be deployed as:

- **Frontend**: `https://your-app.vercel.app` (React app)
- **Backend API**: `https://your-app.vercel.app/api/*` (Node.js serverless functions)

## 🚀 Automated Deployment

### Deploy by Pushing a Tag

```bash
# 1. Update version in package.json (if needed)
# Change "version": "1.0.0" to "version": "1.0.1"

# 2. Commit version change
git add .
git commit -m "release: v1.0.1"
git push origin main

# 3. Create and push tag
git tag v1.0.1
git push origin v1.0.1
```

**GitHub Actions will automatically deploy both client and server to Vercel!** 🎉

### Alternative: Create a GitHub Release

1. Go to your repository → Releases → Create a new release
2. Choose a tag or create a new one
3. Publish the release
4. Automatic deployment to Vercel

## 🔧 Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🌍 Environment Variables in Vercel

Set these in your Vercel project settings:

- `DBURL`: Your MongoDB connection string
- `NODE_ENV`: Set to `production`
- `SESSION_SECRET`: A secure random string for session encryption
- `GOOGLE_MAPS_API_KEY`: Your Google Maps API Key
- `CLOUDINARY_KEY`: Your Cloudinary API key
- `CLOUDINARY_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_SECRET`: Your Cloudinary API secret
- Any other environment variables your backend needs

## 📦 Version Management

### Release Workflow

1. **Update version in package.json**
   ```json
   "version": "1.0.2"
   ```

2. **Commit and push the version change**
   ```bash
   git add .
   git commit -m "release: v1.0.2"
   git push origin main
   ```

3. **Create and push tag**
   ```bash
   git tag v1.0.2
   git push origin v1.0.2
   ```

4. **GitHub Actions automatically deploys both client and server to Vercel!** 🚀

### Version Naming Convention

- Use semantic versioning: `MAJOR.MINOR.PATCH`
- Examples: `v1.0.0`, `v1.2.3`, `v2.0.0`
- Tag must start with `v` to trigger deployment

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are in package.json files
2. **Environment variables not working**: Ensure they're set in Vercel dashboard
3. **API routes not working**: Check that server/vercel.js is properly configured
4. **Database connection issues**: Verify DBURL environment variable

### Check Deployment Status

```bash
vercel ls
```

### View Logs

```bash
vercel logs [deployment-url]
```

### Test API Endpoints

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Test other endpoints
curl https://your-app.vercel.app/api/auth/login
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [GitHub Actions with Vercel](https://vercel.com/docs/deployments/git)

---

**Happy Full-Stack Deploying! 🎉**
