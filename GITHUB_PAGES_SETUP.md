# GitHub Pages Deployment Guide

This guide will help you deploy your Exam ScoreBoard application to GitHub Pages so it works live with all JavaScript and Firebase functionality.

## Method 1: Automatic Deployment (Recommended)

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/Tushar1058/ExamScoreBoard
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**: `gh-pages` branch
   - OR **GitHub Actions** (recommended - automatic deployment)

### Step 2: Enable GitHub Actions (Automatic)

If you choose GitHub Actions:
1. The workflow file (`.github/workflows/deploy.yml`) is already set up
2. Just push your code and it will automatically deploy
3. Go to **Actions** tab to see the deployment progress

### Step 3: Access Your Live Site

After deployment, your site will be available at:
```
https://tushar1058.github.io/ExamScoreBoard/
```

---

## Method 2: Manual Deployment

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build the Project

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the project
- Create/update the `gh-pages` branch
- Push to GitHub
- Make your site live

### Step 4: Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Select source: **Deploy from a branch**
3. Branch: `gh-pages`
4. Folder: `/ (root)`
5. Click **Save**

---

## Important Notes

### Base Path Configuration

The `vite.config.js` is configured with base path `/ExamScoreBoard/` which matches your repository name. If you rename your repository, update the base path in `vite.config.js`.

### Firebase Configuration

Make sure your Firebase configuration in `app.js` is correct. The production build will use the same configuration.

### Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

This will show you exactly how it will look on GitHub Pages.

---

## Troubleshooting

### 404 Errors

- Make sure the base path in `vite.config.js` matches your repository name
- Check that GitHub Pages is enabled and pointing to the correct branch

### JavaScript Not Working

- Ensure all file paths use relative paths (they do)
- Check browser console for errors
- Verify Firebase configuration is correct

### Firebase Connection Issues

- Check Firebase Realtime Database rules allow read/write
- Verify Firebase config in `app.js` is correct
- Check browser console for Firebase errors

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Check for any syntax errors in your code
- Review the build output for specific errors

---

## Updating Your Site

### Automatic (GitHub Actions)

Just push to the `main` branch:
```bash
git add .
git commit -m "Update site"
git push origin main
```

The GitHub Action will automatically build and deploy.

### Manual

After making changes:
```bash
npm run deploy
```

---

## Your Live Site URL

Once deployed, your site will be available at:
**https://tushar1058.github.io/ExamScoreBoard/**

Bookmark this URL and share it with others!

