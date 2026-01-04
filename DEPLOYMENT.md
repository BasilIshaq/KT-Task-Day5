# 🚀 Netlify Deployment Guide

This project has been configured for easy deployment to Netlify from a single GitHub repository.

## 📋 Prerequisites

1. A [GitHub](https://github.com) account
2. A [Netlify](https://www.netlify.com) account
3. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database

## 🔧 Project Structure

```
├── netlify.toml                 # Netlify configuration
├── netlify/
│   └── functions/              # Serverless functions (backend)
│       ├── db.js               # MongoDB connection
│       ├── students.js         # Student CRUD operations
│       └── health.js           # Health check endpoint
├── frontend/                   # React frontend
│   ├── src/
│   ├── .env.production         # Production environment vars
│   └── package.json
├── server.js                   # (Legacy) Local development server
└── package.json               # Root package.json
```

## 📦 Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Configure project for Netlify deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Using Netlify Dashboard (Recommended)

1. Log in to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Functions directory**: `netlify/functions`
6. Click **"Show advanced"** and add environment variables:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
7. Click **"Deploy site"**

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Deploy
netlify deploy --prod
```

### 3. Configure MongoDB Atlas

Make sure your MongoDB Atlas database allows connections from Netlify:

1. Go to MongoDB Atlas Dashboard
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Or add Netlify's IP ranges if you prefer more security

### 4. Set Environment Variables in Netlify

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student_management`
3. Save changes
4. Trigger a new deployment if needed

## 🧪 Testing Your Deployment

Once deployed, your app will be available at: `https://your-site-name.netlify.app`

The API endpoints will be:
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get specific student
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/health` - Health check

## 💻 Local Development

### Running Locally with Original Backend

```bash
# Install dependencies
npm run install:all

# Terminal 1: Start backend server
npm run dev:backend

# Terminal 2: Start frontend
npm run dev:frontend
```

### Running Locally with Netlify Functions

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Install dependencies
npm run install:all

# Create .env file with MONGODB_URI
echo "MONGODB_URI=your_connection_string" > .env

# Run Netlify dev server (includes both frontend and functions)
netlify dev
```

## 🔄 Continuous Deployment

Netlify automatically deploys your site whenever you push changes to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main
```

Netlify will:
1. Pull the latest code
2. Install dependencies
3. Build the frontend
4. Deploy serverless functions
5. Publish your site

## 🐛 Troubleshooting

### Build Fails

- Check **Deploy logs** in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Database Connection Issues

- Verify `MONGODB_URI` is set in Netlify environment variables
- Check MongoDB Atlas Network Access settings
- Ensure connection string includes database name

### API Not Working

- Check **Function logs** in Netlify dashboard
- Verify environment variables are set
- Test individual endpoints using the Netlify function URL

### Frontend Can't Connect to API

- Check browser console for errors
- Verify `.env.production` is set correctly
- Make sure `netlify.toml` redirects are configured

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🎉 Success!

Your Student Management System is now deployed and accessible from anywhere! 🎓
