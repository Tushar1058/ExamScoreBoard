# Exam ScoreBoard

A modern, full-stack web application for managing and viewing exam scores with a clean, professional interface. Built with Firebase Realtime Database, this application provides separate interfaces for students and administrators to manage academic performance data efficiently.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Firebase Setup](#firebase-setup)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Exam ScoreBoard is a comprehensive academic management system designed to streamline the process of recording, storing, and viewing student examination scores. The application features a dual-interface design:

- **User Interface**: A read-only view where students can access their scores filtered by their roll number
- **Admin Interface**: A full-featured dashboard for administrators to add, edit, and manage student scores across multiple batches, semesters, and subjects

The application supports both theory subjects (with T1, T2, T3, and TA components) and laboratory subjects (with P1, P2, P3 components), making it versatile for various academic assessment structures.

## ✨ Features

### User Features
- **Personalized Score View**: Automatically filters and displays scores for the logged-in student (Roll No: 231030044)
- **Subject Organization**: Clear separation between theory and lab subjects
- **Comprehensive Display**: 
  - Theory subjects show: T1, T2, T3, and TA marks
  - Lab subjects show: P1, P2, P3 marks
- **SGPA Calculator**: Automatic calculation of Semester Grade Point Average for all subjects
- **Batch & Semester Filtering**: Easy navigation through different academic periods
- **Modern UI**: Dark theme with blue accents for comfortable viewing

### Admin Features
- **Secure Authentication**: Username/password protected admin panel
- **Roll Number Based Management**: Filter and manage students by roll number
- **Subject-Specific Forms**: Dynamic forms that adapt based on subject type (theory vs lab)
- **Real-time Updates**: Instant synchronization with Firebase Realtime Database
- **Bulk Management**: Add, edit, and delete student records efficiently
- **Data Validation**: Input validation for scores (0-100 range)

### Technical Features
- **Real-time Data Sync**: Firebase Realtime Database ensures instant updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modular Architecture**: Clean separation of concerns with dedicated modules
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance Optimized**: Efficient data loading and rendering

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox, grid, and custom properties
- **JavaScript (ES6+)**: 
  - ES6 Modules for code organization
  - Async/await for asynchronous operations
  - Modern DOM manipulation

### Backend & Database
- **Firebase Realtime Database**: 
  - NoSQL database for real-time data synchronization
  - JSON-based data structure
  - Real-time listeners for instant updates

### Build Tools & Development
- **Vite**: Fast build tool and development server
- **Node.js**: JavaScript runtime environment
- **npm**: Package management

### Deployment
- **Firebase Hosting**: Production hosting with CDN
- **Git**: Version control
- **GitHub**: Code repository and collaboration

## 🏗 Architecture

The application follows a client-side architecture with Firebase as the backend:

```
┌─────────────────────────────────────────┐
│         User Interface (HTML/CSS/JS)    │
│  ┌──────────────┐  ┌──────────────┐   │
│  │  User Site   │  │ Admin Panel  │   │
│  │  (Read-only) │  │  (Full CRUD) │   │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│      Firebase Realtime Database         │
│  ┌──────────────────────────────────┐  │
│  │  scores/                         │  │
│  │    ├── {batch}/                  │  │
│  │    │   ├── {semester}/           │  │
│  │    │   │   ├── {subject}/        │  │
│  │    │   │   │   └── {studentId}/  │  │
│  │    │   │   │       └── scores    │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Data Flow

1. **User Site**: 
   - Selects batch and semester
   - Application queries Firebase for all subjects
   - Filters data by roll number (231030044)
   - Displays results in organized tables

2. **Admin Site**:
   - Authenticates with username/password
   - Selects batch, semester, and subject
   - Optionally filters by roll number
   - Performs CRUD operations on student data
   - Changes sync in real-time to Firebase

## 📁 Project Structure

```
ExamScoreBoard/
├── index.html          # User interface entry point
├── admin.html          # Admin dashboard entry point
├── styles.css          # Global styles and theme
├── app.js              # Firebase configuration and initialization
├── user.js             # User site logic and data handling
├── admin.js            # Admin panel logic and CRUD operations
├── package.json        # Project dependencies and scripts
├── firebase.json       # Firebase hosting configuration
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

### File Descriptions

- **index.html**: Main user interface with batch/semester selection and score display
- **admin.html**: Admin login and dashboard interface
- **app.js**: Firebase SDK initialization and database reference exports
- **user.js**: Handles data fetching, filtering by roll number, and scoreboard rendering
- **admin.js**: Manages authentication, data CRUD operations, and form handling
- **styles.css**: Complete styling system with dark theme, responsive design, and component styles

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tushar1058/ExamScoreBoard.git
   cd ExamScoreBoard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database
   - Get your Firebase configuration
   - Update `app.js` with your Firebase credentials

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173/`

## 📖 Usage

### For Students (User Site)

1. Open the application in your browser
2. Select your **Batch** (e.g., A11, A12, etc.)
3. Select your **Semester** (e.g., EVEN2024, ODD2025, etc.)
4. Your scores will automatically load and display:
   - Theory subjects in one table (T1, T2, T3, TA)
   - Lab subjects in another table (P1, P2, P3)
5. Click **"Calculate SGPA"** to view your Semester Grade Point Average

### For Administrators

1. Navigate to the Admin Login page
2. Enter credentials:
   - Username: `234`
   - Password: `admin`
3. Select **Batch**, **Semester**, and **Subject**
4. Click **"Load Data"** and optionally enter a roll number to filter
5. **Add New Student**: Click the button, enter roll number and scores
6. **Edit Scores**: Modify values in the table and click **"Save"**
7. **Delete Student**: Click **"Delete"** button (with confirmation)

## 🌐 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Public directory: `dist`
   - Single-page app: `No`

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

5. **Access your live site**
   - `https://exam-scoreboard.web.app`
   - `https://exam-scoreboard.firebaseapp.com`

### Alternative: GitHub Pages

For static hosting alternatives, you can use GitHub Pages, Netlify, or Vercel. Note that Firebase modules work best with Firebase Hosting.

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `exam-scoreboard`
4. Follow the setup wizard

### Step 2: Enable Realtime Database

1. Navigate to "Realtime Database" in Firebase Console
2. Click "Create Database"
3. Choose location (closest to your users)
4. Start in "Test mode" for development

### Step 3: Get Configuration

1. Go to Project Settings (⚙️ icon)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register app and copy configuration

### Step 4: Update app.js

Replace the Firebase configuration in `app.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 5: Database Structure

The database follows this structure:

```
scores/
  ├── {batch}/
  │   ├── {semester}/
  │   │   ├── {subject}/
  │   │   │   ├── {studentId}/
  │   │   │   │   ├── rollNo: "231030044"
  │   │   │   │   ├── T1: "85" (theory subjects)
  │   │   │   │   ├── T2: "90"
  │   │   │   │   ├── T3: "88"
  │   │   │   │   ├── TA: "95"
  │   │   │   │   ├── P1: "92" (lab subjects)
  │   │   │   │   ├── P2: "87"
  │   │   │   │   └── P3: "91"
```

### Step 6: Security Rules

For development (Test mode):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

For production, implement proper authentication and restrict write access.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tushar Punia**
- GitHub: [@Tushar1058](https://github.com/Tushar1058)
- Project Repository: [ExamScoreBoard](https://github.com/Tushar1058/ExamScoreBoard)

## 🙏 Acknowledgments

- Firebase for providing excellent backend services
- Vite for fast development experience
- All contributors and users of this project

---

**Note**: This application is designed for educational purposes. For production use, implement proper authentication, security rules, and data validation.
