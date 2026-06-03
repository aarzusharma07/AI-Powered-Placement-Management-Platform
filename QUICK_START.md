# 🎯 Quick Start Guide - AI Placement System

## ✅ What's Been Created

### Backend with Full AI Integration:
- ✅ Express.js server with REST API
- ✅ MongoDB database models (User, Student, Job, Application)
- ✅ **AI Resume Parser** - Extracts skills, education, projects
- ✅ **AI Job Recommendations** - Matches students with jobs
- ✅ **AI Candidate Ranking** - Ranks applicants for recruiters
- ✅ **AI Interview Prep** - Generates personalized interview questions
- ✅ Authentication routes
- ✅ Database seeding script

### Frontend (Already Running):
- ✅ React UI at http://localhost:3000
- ✅ Student & Recruiter views
- ✅ Dashboard components

## 🚀 Step-by-Step Setup

### **STEP 1: Install & Start MongoDB**

#### Option A: Windows (Using MongoDB Community)
```
1. Download: https://www.mongodb.com/try/download/community
2. Run installer → Complete Setup
3. Keep "MongoDB as a Service" checked
4. MongoDB starts automatically
```

#### Option B: Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Option C: Already have MongoDB?
Just make sure the service is running and accessible at `mongodb://localhost:27017`

### **STEP 2: Install MongoDB Compass (Optional but Recommended)**

Download: https://www.mongodb.com/products/compass

This is a GUI tool to visualize and manage your MongoDB data.

### **STEP 3: Seed Sample Data**

```bash
npm run seed-db
```

This creates:
- 4 test users (2 students, 1 recruiter, 1 admin)
- 3 jobs
- Sample student profiles

### **STEP 4: Start Both Servers**

**Option A: Run Both Together**
```bash
npm run dev:full
```

**Option B: Run Separately (Two Terminals)**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### **STEP 5: Verify Everything Works**

✅ **Frontend**: http://localhost:3000
✅ **Backend API**: http://localhost:5000/api/health
✅ **MongoDB Compass**: Connect to `mongodb://localhost:27017`

## 🧪 Test the AI Features

### Test Credentials:
```
Student:
Email: sarah@university.edu
Password: password123

Recruiter:
Email: john@techcorp.com
Password: password123
```

### Test Scenarios:

**1. Resume Upload & Analysis:**
- Login as student
- Upload resume
- See AI resume score (0-100) and parsed data

**2. Job Recommendations:**
- Login as student
- View "Recommendations" section
- See AI-matched jobs with match scores

**3. Candidate Ranking:**
- Login as recruiter
- Post a job
- View candidates ranked by AI

**4. Interview Prep:**
- Login as student
- Enter job description
- Get personalized interview questions

## 📊 MongoDB Compass - What to Check

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `ai-placement-db` database
4. Check these collections:
   - **users** (4 test users)
   - **students** (2 student profiles)
   - **jobs** (3 job postings)

## 🔗 Key API Endpoints to Test

### Resume Upload (AI)
```bash
curl -X POST http://localhost:5000/api/student/resume/upload \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "resumeText": "Your resume text..."
  }'
```

### Get Job Recommendations (AI)
```bash
curl http://localhost:5000/api/student/recommendations/user_id_here
```

### Generate Interview Questions (AI)
```bash
curl -X POST http://localhost:5000/api/student/interview-prep \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "jobDescription": "Looking for React developer..."
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
- Windows: Check Services for "MongoDB"
- Mac: `brew services start mongodb-community`
- Linux: `sudo service mongodb start`

### Port Already in Use (5000)
**Solution:** Change PORT in `.env` file:
```
PORT=5001
```

### Module Not Found Error
**Solution:** Run npm install again:
```bash
npm install
```

## 📚 Full Documentation

- **MONGODB_SETUP_GUIDE.md** - Detailed MongoDB setup
- **BACKEND_SETUP.md** - Backend architecture & API docs
- **README.md** - Project overview

## 🎉 You're Ready!

1. ✅ npm install (done)
2. ⏳ Start MongoDB (do this)
3. ⏳ npm run seed-db (do this)
4. ⏳ npm run dev:full (do this)
5. ✅ Open http://localhost:3000

---

**Questions?** Check the documentation files or backend/routes/* for all endpoint details.
