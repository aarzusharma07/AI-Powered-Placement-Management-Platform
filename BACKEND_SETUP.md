# 🚀 Full Stack AI Placement System - Setup Complete!

## ✅ Backend Structure Created

### Folder Structure:
```
backend/
├── models/
│   ├── User.js           (User authentication schema)
│   ├── Student.js        (Student profiles & resume data)
│   ├── Job.js            (Job postings)
│   └── Application.js    (Application tracking)
├── routes/
│   ├── auth.js           (Login/Register)
│   ├── student.js        (Student features)
│   ├── recruiter.js      (Recruiter features)
│   ├── job.js            (Job management)
│   └── ai.js             (AI endpoints)
├── services/
│   └── aiService.js      (AI: Resume parsing, recommendations, ranking, questions)
└── scripts/
    └── seed.js           (Database seeding)

server.js                  (Express backend entry point)
.env                       (Environment configuration)
```

## 🤖 AI Services Integrated:

### 1. **Resume Parser (NLP/NER)**
```
POST /api/ai/analyze-resume
- Extracts education, experience, skills, projects
- AI Score: 0-100
- Parsed JSON structure
```

### 2. **Job Recommendation Engine**
```
GET /api/student/recommendations/:userId
- Analyzes student profile
- Matches with open jobs
- Returns ranked recommendations with match scores
```

### 3. **Candidate Ranking (AI)**
```
POST /api/recruiter/candidates/rank
- Ranks applicants for a job
- Considers skills, GPA, experience
- Provides ranking reasoning
```

### 4. **Interview Question Generator**
```
POST /api/student/interview-prep
- Generates technical questions (5)
- Generates behavioral questions (5)
- Based on student profile + job description
```

## 📦 Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup MongoDB
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Download MongoDB Compass from: https://www.mongodb.com/products/compass

### Step 3: Seed Database
```bash
npm run seed-db
```

### Step 4: Start Both Frontend & Backend
```bash
npm run dev:full
```

Or in separate terminals:
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run server
```

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Student Features
```
GET /api/student/profile/:userId
PUT /api/student/profile/:userId
POST /api/student/resume/upload               ⭐ AI Resume Parsing
GET /api/student/recommendations/:userId      ⭐ AI Job Recommendations
POST /api/student/apply
GET /api/student/applications/:userId
POST /api/student/interview-prep             ⭐ AI Interview Questions
```

### Recruiter Features
```
POST /api/recruiter/jobs
GET /api/recruiter/jobs/:recruiterId
POST /api/recruiter/candidates/rank          ⭐ AI Candidate Ranking
GET /api/recruiter/dashboard/:recruiterId
```

### AI Services (Direct Access)
```
POST /api/ai/analyze-resume                  ⭐ Resume Analysis
POST /api/ai/recommend-jobs                  ⭐ Job Recommendations
POST /api/ai/rank-candidates                 ⭐ Candidate Ranking
POST /api/ai/generate-interview-questions    ⭐ Interview Questions
POST /api/ai/smart-search                    ⭐ Smart Job Search
```

## 🗄️ MongoDB Collections

- **users** - All user accounts
- **students** - Student profiles with resume data
- **jobs** - Job postings
- **applications** - Application tracking

## 📊 MongoDB Compass Connection

```
mongodb://localhost:27017/ai-placement-db
```

## 🧪 Test Credentials

```
Student:
Email: sarah@university.edu
Password: password123

Recruiter:
Email: john@techcorp.com
Password: password123
```

## 📚 Documentation

See `MONGODB_SETUP_GUIDE.md` for detailed MongoDB setup and schema information.

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start MongoDB service
3. ✅ Seed database: `npm run seed-db`
4. ✅ Run full stack: `npm run dev:full`
5. ✅ Access app at: http://localhost:3000

---

**Backend Server:** http://localhost:5000
**Frontend App:** http://localhost:3000
**MongoDB Compass:** Connect to mongodb://localhost:27017
