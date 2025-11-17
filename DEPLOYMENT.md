# Deployment Guide - Exam ScoreBoard

## Step 1: Push to GitHub

### Option A: Using HTTPS (Personal Access Token)

1. **Create a Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "ExamScoreBoard")
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push to GitHub:**
   ```bash
   cd "/Users/tushar07/Desktop/Exam ScoreBoard"
   git push -u origin main
   ```
   - When prompted for username: Enter your GitHub username
   - When prompted for password: **Paste your Personal Access Token** (not your password)

### Option B: Using SSH (Recommended)

1. **Check if you have SSH key:**
   ```bash
   ls -al ~/.ssh
   ```

2. **If no SSH key, generate one:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Press Enter twice for no passphrase (or set one)
   ```

3. **Add SSH key to GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste the key and save

4. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:Tushar1058/ExamScoreBoard.git
   git push -u origin main
   ```

---

## Step 2: Deploy to Firebase Hosting (Recommended)

Since you're already using Firebase, Firebase Hosting is the best option.

### Prerequisites:
- Firebase CLI installed
- Firebase project already set up

### Steps:

1. **Install Firebase CLI (if not installed):**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting:**
   ```bash
   cd "/Users/tushar07/Desktop/Exam ScoreBoard"
   firebase init hosting
   ```
   
   **Configuration:**
   - Select your existing Firebase project: `exam-scoreboard`
   - Public directory: `dist` (or create it)
   - Single-page app: `No`
   - Set up automatic builds: `No`

4. **Update firebase.json:**
   Create/update `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

7. **Your site will be live at:**
   ```
   https://exam-scoreboard.web.app
   ```
   or
   ```
   https://exam-scoreboard.firebaseapp.com
   ```

---

## Step 3: Alternative - Deploy to GitHub Pages

If you prefer GitHub Pages (free hosting):

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   Add to `scripts`:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to your GitHub repo → Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be at: `https://tushar1058.github.io/ExamScoreBoard`

**Note:** GitHub Pages doesn't support Firebase modules well. You'll need to use CDN links instead.

---

## Step 4: Update Firebase Config for Production

Make sure your `app.js` has the correct Firebase configuration. It should already be set up.

---

## Quick Deploy Commands Summary

### For Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```

### For GitHub Pages:
```bash
npm run build
npm run deploy
```

---

## Troubleshooting

### Firebase Hosting Issues:
- Make sure you're logged in: `firebase login`
- Check your project: `firebase projects:list`
- Use the correct project: `firebase use exam-scoreboard`

### GitHub Push Issues:
- Use Personal Access Token instead of password
- Or set up SSH keys for easier authentication

### Build Issues:
- Make sure all dependencies are installed: `npm install`
- Check for errors: `npm run build`

---

## Live Site URLs

After deployment, your site will be available at:

**Firebase Hosting:**
- https://exam-scoreboard.web.app
- https://exam-scoreboard.firebaseapp.com

**GitHub Pages (if used):**
- https://tushar1058.github.io/ExamScoreBoard

