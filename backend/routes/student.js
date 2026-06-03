import express from 'express'
import Student from '../models/Student.js'
import * as aiService from '../services/aiService.js'

const router = express.Router()

// Get student profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update student profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    )
    res.json({ message: 'Profile updated', student })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Upload and parse resume (AI Integration)
router.post('/resume/upload', async (req, res) => {
  try {
    const { userId, resumeText } = req.body

    // AI Resume Parsing
    const parsedData = await aiService.parseResume(resumeText)

    // Update student with parsed resume data
    const student = await Student.findOneAndUpdate(
      { userId },
      {
        'resume.parsedData': parsedData,
        'resume.aiScore': parsedData.aiScore,
        'resume.uploadedAt': new Date(),
        skills: parsedData.skills
      },
      { new: true }
    )

    res.json({
      message: 'Resume parsed successfully',
      parsedData,
      aiScore: parsedData.aiScore,
      student
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get job recommendations (AI Recommendation Engine)
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    // Mock job data - in production, fetch from DB
    const mockJobs = [
      {
        _id: '1',
        title: 'React Developer',
        company: 'Tech Company A',
        description: 'Looking for React and Node.js developers',
        requiredSkills: ['React', 'JavaScript', 'CSS'],
        minGPA: 7.0,
        maxBacklogs: 0,
        allowedBranches: ['Computer Science', 'IT']
      },
      {
        _id: '2',
        title: 'Full Stack Developer',
        company: 'Tech Company B',
        description: 'Need MERN stack developers',
        requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        minGPA: 7.5,
        maxBacklogs: 0,
        allowedBranches: ['Computer Science']
      }
    ]

    // AI Recommendation Engine
    const recommendations = await aiService.recommendJobs(student, mockJobs)

    res.json({
      message: 'Job recommendations generated',
      recommendations,
      count: recommendations.length
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Apply for job
router.post('/apply', async (req, res) => {
  try {
    const { userId, jobId } = req.body

    const student = await Student.findOne({ userId })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    // Add application to student's history
    student.applicationHistory.push({
      jobId,
      status: 'applied',
      appliedAt: new Date(),
      scores: {
        aiMatchScore: Math.floor(Math.random() * 100)
      }
    })

    await student.save()

    res.json({ message: 'Application submitted successfully', student })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get application tracking
router.get('/applications/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.json({
      applications: student.applicationHistory,
      placementStatus: student.placementStatus,
      placedIn: student.placedIn
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get interview questions (AI Interview Prep)
router.post('/interview-prep', async (req, res) => {
  try {
    const { userId, jobDescription } = req.body

    const student = await Student.findOne({ userId })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    const mockJob = { title: 'Target Job', description: jobDescription }
    const questions = await aiService.generateInterviewQuestions(student, mockJob)

    res.json({
      message: 'Interview questions generated',
      questions,
      tips: [
        'Practice answering these questions out loud',
        'Research the company thoroughly',
        'Prepare examples from your projects',
        'Ask thoughtful questions about the role'
      ]
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
