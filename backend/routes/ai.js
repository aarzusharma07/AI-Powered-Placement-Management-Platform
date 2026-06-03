import express from 'express'
import * as aiService from '../services/aiService.js'

const router = express.Router()

// AI Resume Analysis
router.post('/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body

    const analysis = await aiService.parseResume(resumeText)

    res.json({
      message: 'Resume analyzed successfully',
      analysis,
      score: analysis.aiScore,
      suggestions: [
        'Add more quantifiable achievements',
        'Highlight technical projects',
        'Include certifications and training',
        'Improve formatting and clarity'
      ]
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Job Recommendations
router.post('/recommend-jobs', async (req, res) => {
  try {
    const { studentProfile, jobs } = req.body

    const recommendations = await aiService.recommendJobs(studentProfile, jobs)

    res.json({
      message: 'Job recommendations generated',
      recommendations: recommendations.slice(0, 5),
      totalMatches: recommendations.length
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Candidate Ranking
router.post('/rank-candidates', async (req, res) => {
  try {
    const { candidates, jobDescription } = req.body

    const ranked = await aiService.rankCandidates(candidates, jobDescription)

    res.json({
      message: 'Candidates ranked by AI',
      ranked: ranked.slice(0, 10),
      totalCandidates: ranked.length
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Interview Questions Generator
router.post('/generate-interview-questions', async (req, res) => {
  try {
    const { studentProfile, jobDescription } = req.body

    const questions = await aiService.generateInterviewQuestions(studentProfile, jobDescription)

    res.json({
      message: 'Interview questions generated',
      questions,
      interviewTips: [
        'Practice your responses beforehand',
        'Research the company and role thoroughly',
        'Prepare examples using the STAR method',
        'Ask thoughtful questions about the role and company culture',
        'Arrive on time and dress professionally'
      ]
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI-powered job search
router.post('/smart-search', async (req, res) => {
  try {
    const { query, filters } = req.body

    // Mock smart search with AI
    const mockResults = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'Tech Corp',
        matchScore: 95,
        reason: 'Excellent match for your React expertise'
      },
      {
        id: '2',
        title: 'Full Stack Engineer',
        company: 'StartUp Inc',
        matchScore: 87,
        reason: 'Your MERN stack experience is a great fit'
      }
    ]

    res.json({
      message: 'Smart search completed',
      results: mockResults,
      totalMatches: 2
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
