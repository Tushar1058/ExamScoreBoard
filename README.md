# Exam ScoreBoard

A clean, professional exam scoreboard application built with Firebase Realtime Database, featuring separate user and admin interfaces.

## Features

- **User Site**: View scores filtered by roll number (231030044)
- **Admin Site**: Manage student scores with roll number-based filtering
- **Subject-based Organization**: Separate theory subjects (T1, T2, T3, TA) and lab subjects (P1, P2, P3)
- **SGPA Calculation**: Automatic SGPA calculation for all subjects
- **Dark Theme**: Modern black UI with blue accents

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Tushar1058/ExamScoreBoard.git
   cd ExamScoreBoard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update Firebase configuration in `app.js` with your Firebase project details

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173/ in your browser

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```

Your site will be live at: `https://exam-scoreboard.web.app`

---

# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "exam-scoreboard")
4. Click "Continue"
5. Disable Google Analytics (optional) or enable it if you want
6. Click "Create project"
7. Wait for the project to be created, then click "Continue"

## Step 2: Set Up Realtime Database

1. In your Firebase project, click on "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose a location for your database (select the closest region)
4. Click "Next"
5. **Important**: Start in "Test mode" for development (you can change security rules later)
6. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "Exam ScoreBoard")
6. Click "Register app"
7. You'll see your Firebase configuration object. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 4: Update Your app.js File

1. Open `app.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: Set Up Database Structure

Your database structure should be organized as follows:

```
scores/
  ├── A11/
  │   ├── EVEN2024/
  │   │   ├── FORMAL_LANGUAGE_AUTOMATA_THEORY/
  │   │   │   ├── student1_id/
  │   │   │   │   ├── name: "John Doe"
  │   │   │   │   ├── rollNo: "A11-001"
  │   │   │   │   ├── T1: "85"
  │   │   │   │   ├── T2: "90"
  │   │   │   │   ├── T3: "88"
  │   │   │   │   └── TA: "95"
  │   │   │   └── student2_id/
  │   │   ├── COMPUTER_GRAPHICS_LAB/
  │   │   │   ├── student1_id/
  │   │   │   │   ├── name: "John Doe"
  │   │   │   │   ├── rollNo: "A11-001"
  │   │   │   │   ├── P1: "92"
  │   │   │   │   ├── P2: "87"
  │   │   │   │   └── P3: "91"
  │   │   │   └── ...
  │   │   └── [other subjects]
  │   ├── ODD2025/
  │   └── EVEN2025/
  ├── A12/
  └── ...
```

**Note:** 
- Regular subjects store: T1, T2, T3, TA
- Lab subjects store: P1, P2, P3 only

## Step 6: Configure Database Rules (Optional but Recommended)

1. Go to "Realtime Database" in Firebase Console
2. Click on the "Rules" tab
3. For development, you can use these rules (allows read/write for everyone):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**⚠️ Warning**: These rules allow anyone to read and write. For production, you should implement proper authentication and security rules.

4. Click "Publish"

## Step 7: Test Your Application

1. Open `index.html` in a web browser
2. Select a batch and semester
3. If no data exists, use the admin panel to add students
4. Test the admin login (username: `234`, password: `admin`)
5. Add some test data through the admin panel
6. Verify that data appears on the user site

## Step 8: Add Initial Data (Optional)

You can manually add data through Firebase Console or use the admin panel:

1. Login to admin panel
2. Select a batch (e.g., A11)
3. Select a semester (e.g., EVEN2024)
4. Click "Add New Student"
5. Enter student details
6. Edit scores and click "Save"

## Troubleshooting

- **CORS Errors**: Make sure you're running the app from a web server (not just opening the HTML file). You can use:
  - VS Code Live Server extension
  - Python: `python -m http.server 8000`
  - Node.js: `npx http-server`

- **Database Connection Issues**: 
  - Verify your Firebase config in `app.js`
  - Check that Realtime Database is enabled
  - Verify database rules allow read/write

- **Module Import Errors**: 
  - Make sure you're using a web server (not file:// protocol)
  - Check browser console for specific error messages

## Security Notes

For production use:
1. Implement Firebase Authentication
2. Set up proper database security rules
3. Restrict write access to authenticated admin users only
4. Consider using Firebase Hosting for deployment

## Database Rules for Production (Example)

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": "auth != null && auth.uid == 'admin-user-id'"
    }
  }
}
```

Replace `'admin-user-id'` with your actual admin user ID from Firebase Authentication.

