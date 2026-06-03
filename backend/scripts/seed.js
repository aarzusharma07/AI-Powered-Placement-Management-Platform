// Database Seeding Script
// Run with: npm run seed-db

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Job from '../models/Job.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-placement-db')
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Student.deleteMany({})
    await Job.deleteMany({})
    console.log('🧹 Cleared existing data')

    // Create test users
    const testUsers = [
      {
        name: 'Sarah Jenkins',
        email: 'sarah@university.edu',
        password: 'password123',
        role: 'student',
        university: 'Tech University',
        isVerified: true
      },
      {
        name: 'David Miller',
        email: 'david@university.edu',
        password: 'password123',
        role: 'student',
        university: 'Tech University',
        isVerified: true
      },
      {
        name: 'John Smith',
        email: 'john@techcorp.com',
        password: 'password123',
        role: 'recruiter',
        company: 'Tech Corp',
        isVerified: true
      },
      {
        name: 'Emily Brown',
        email: 'emily@university.edu',
        password: 'password123',
        role: 'officer',
        university: 'Tech University',
        isVerified: true
      }
    ]

    const users = await User.insertMany(testUsers)
    console.log('✅ Created test users')

    // Create student profiles
    const students = [
      {
        userId: users[0]._id,
        gpa: 9.1,
        registrarGpa: 9.1,
        backlogs: 0,
        branch: 'Computer Science',
        graduationYear: 2024,
        skills: ['React', 'Node.js', 'SQL', 'Python', 'JavaScript', 'Git'],
        verificationStatus: 'verified',
        placementStatus: 'unplaced'
      },
      {
        userId: users[1]._id,
        gpa: 7.9,
        registrarGpa: 7.9,
        backlogs: 0,
        branch: 'Computer Science',
        graduationYear: 2024,
        skills: ['React', 'CSS', 'JavaScript', 'HTML', 'TypeScript'],
        verificationStatus: 'verified',
        placementStatus: 'unplaced'
      }
    ]

    await Student.insertMany(students)
    console.log('✅ Created student profiles')

    // Create job postings
    const jobs = [
      {
        recruiterId: users[2]._id,
        company: 'Tech Corp',
        title: 'Senior React Developer',
        description: 'Looking for experienced React and Node.js developers to join our team',
        requiredSkills: ['React', 'JavaScript', 'CSS', 'Node.js', 'MongoDB'],
        minGPA: 7.5,
        maxBacklogs: 0,
        allowedBranches: ['Computer Science', 'IT'],
        jobType: 'full-time',
        salary: { min: 50000, max: 80000, currency: 'USD' },
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'open'
      },
      {
        recruiterId: users[2]._id,
        company: 'Tech Corp',
        title: 'Full Stack Developer',
        description: 'Join our team to build scalable web applications using MERN stack',
        requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Express'],
        minGPA: 7.0,
        maxBacklogs: 1,
        allowedBranches: ['Computer Science', 'IT', 'Electronics'],
        jobType: 'full-time',
        salary: { min: 45000, max: 75000, currency: 'USD' },
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: 'open'
      },
      {
        recruiterId: users[2]._id,
        company: 'StartUp Inc',
        title: 'Frontend Developer Intern',
        description: 'Internship opportunity for developing modern UI components',
        requiredSkills: ['React', 'HTML', 'CSS', 'JavaScript'],
        minGPA: 6.5,
        maxBacklogs: 2,
        allowedBranches: ['Computer Science', 'IT'],
        jobType: 'internship',
        salary: { min: 0, max: 15000, currency: 'USD' },
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: 'open'
      }
    ]

    await Job.insertMany(jobs)
    console.log('✅ Created job postings')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\nTest Credentials:')
    console.log('---')
    console.log('Student: sarah@university.edu / password123')
    console.log('Student: david@university.edu / password123')
    console.log('Recruiter: john@techcorp.com / password123')
    console.log('Officer: emily@university.edu / password123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
