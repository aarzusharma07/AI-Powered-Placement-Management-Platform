# MongoDB Setup & Integration Guide

## 📊 MongoDB Compass Installation & Setup

### Step 1: Install MongoDB Community Edition

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" setup
4. Keep MongoDB as a Service enabled
5. Click "Finish"

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo service mongodb start
```

### Step 2: Install MongoDB Compass

Download from: https://www.mongodb.com/products/compass

MongoDB Compass is the GUI for MongoDB that lets you visualize and manage data.

### Step 3: Connect to MongoDB

Open MongoDB Compass and connect to:
```
mongodb://localhost:27017/ai-placement-db
```

## 🗄️ Database Schema Overview

### Collections in `ai-placement-db`:

#### 1. **users**
Stores all user accounts (students, recruiters, admins, placement officers)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: "student" | "recruiter" | "officer" | "admin",
  company: String,
  university: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **students**
Student profiles with resume data and placement tracking
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  gpa: Number,
  backlogs: Number,
  branch: String,
  skills: [String],
  resume: {
    filename: String,
    aiScore: Number,
    parsedData: {
      education: [{}],
      experience: [{}],
      skills: [String],
      projects: [{}]
    }
  },
  placementStatus: "unplaced" | "placed",
  applicationHistory: [{}],
  createdAt: Date
}
```

#### 3. **jobs**
Job postings by recruiters
```javascript
{
  _id: ObjectId,
  recruiterId: ObjectId (ref: User),
  company: String,
  title: String,
  description: String,
  requiredSkills: [String],
  minGPA: Number,
  maxBacklogs: Number,
  salary: { min, max, currency },
  status: "open" | "closed",
  applications: [{
    studentId: ObjectId,
    status: String,
    aiMatchScore: Number
  }],
  postedAt: Date
}
```

#### 4. **applications**
Track student applications for jobs
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  jobId: ObjectId (ref: Job),
  status: "applied" | "shortlisted" | "interviewed" | "offered",
  aiMatchScore: Number,
  interviewSchedule: {},
  offer: {},
  appliedAt: Date
}
```

## 🚀 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Student Routes
- `GET /api/student/profile/:userId` - Get student profile
- `PUT /api/student/profile/:userId` - Update profile
- `POST /api/student/resume/upload` - Upload & parse resume (AI)
- `GET /api/student/recommendations/:userId` - Get job recommendations (AI)
- `POST /api/student/apply` - Apply for job
- `GET /api/student/applications/:userId` - Track applications
- `POST /api/student/interview-prep` - Generate interview questions (AI)

### Recruiter Routes
- `POST /api/recruiter/jobs` - Post a job
- `GET /api/recruiter/jobs/:recruiterId` - Get recruiter's jobs
- `POST /api/recruiter/candidates/rank` - Rank candidates (AI)
- `GET /api/recruiter/dashboard/:recruiterId` - Hiring dashboard

### Job Routes
- `GET /api/jobs` - Get all open jobs
- `GET /api/jobs/:jobId` - Get job details
- `GET /api/jobs/search` - Search jobs

### AI Routes
- `POST /api/ai/analyze-resume` - Analyze resume (AI)
- `POST /api/ai/recommend-jobs` - Recommend jobs (AI)
- `POST /api/ai/rank-candidates` - Rank candidates (AI)
- `POST /api/ai/generate-interview-questions` - Generate questions (AI)
- `POST /api/ai/smart-search` - Smart job search (AI)

## 🎯 Key AI Features Integrated

### 1. **Resume Parser (NLP/NER)**
- Extracts education, experience, skills, projects
- Calculates resume quality score (0-100)
- Normalizes skills into standardized taxonomy

### 2. **Job Recommendation Engine (Vector Matching)**
- Analyzes student skills vs. job requirements
- Calculates match score (0-100)
- Considers GPA, backlogs, branch eligibility
- Returns ranked recommendations

### 3. **Candidate Ranking (Recruiter View)**
- Ranks applicants by AI scoring
- Considers multiple factors: skills, GPA, experience
- Provides reasoning for rankings

### 4. **Interview Question Generator**
- Generates technical questions based on skills
- Creates behavioral questions
- Customized for target job

## 🔧 Running the Full Application

### Terminal 1 - Start Backend:
```bash
npm install
npm run server
# Server runs on http://localhost:5000
```

### Terminal 2 - Start Frontend:
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### Or run both together:
```bash
npm run dev:full
```

## 📝 Seeding Sample Data

Create sample users, students, jobs in MongoDB:
```bash
npm run seed-db
```

## ✅ Verify Setup

1. **Check MongoDB Connection:**
   - Open MongoDB Compass
   - Connect to `mongodb://localhost:27017`
   - You should see `ai-placement-db` database

2. **Check Backend API:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"Server is running"}`

3. **Frontend Ready:**
   - Open http://localhost:3000 in browser
   - Login with test credentials

## 🐛 Troubleshooting

**"MongoDB connection refused"**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**"Port 5000 already in use"**
- Change PORT in `.env`

**"Cannot find module"**
- Run `npm install` to install all dependencies

## 📚 Additional Resources

- MongoDB Documentation: https://docs.mongodb.com
- Mongoose ODM: https://mongoosejs.com
- Express.js: https://expressjs.com
