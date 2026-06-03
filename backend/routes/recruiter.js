import express from 'express'
import Job from '../models/Job.js'
import Student from '../models/Student.js'
import * as aiService from '../services/aiService.js'

const router = express.Router()

// Post a job
router.post('/jobs', async (req, res) => {
  try {
    const { recruiterId, company, title, description, requiredSkills, minGPA, salary, deadline } = req.body

    const newJob = new Job({
      recruiterId,
      company,
      title,
      description,
      requiredSkills,
      minGPA,
      salary,
      deadline,
      status: 'open'
    })

    await newJob.save()

    res.status(201).json({
      message: 'Job posted successfully',
      job: newJob
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get recruiter's jobs
router.get('/jobs/:recruiterId', async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get candidates ranked by AI (Candidate Ranking Engine)
router.post('/candidates/rank', async (req, res) => {
  try {
    const { jobId } = req.body

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    // Mock candidates - in production, fetch from DB
    const candidates = await Student.find({
      gpa: { $gte: job.minGPA },
      backlogs: { $lte: job.maxBacklogs },
      branch: { $in: job.allowedBranches }
    }).limit(50)

    // AI Candidate Ranking
    const rankedCandidates = await aiService.rankCandidates(candidates, job.description)

    res.json({
      message: 'Candidates ranked by AI',
      job: {
        title: job.title,
        company: job.company
      },
      rankedCandidates
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update application status
router.put('/applications/:applicationId/status', async (req, res) => {
  try {
    const { status } = req.body

    // Mock update - in production, update Application model
    res.json({
      message: 'Application status updated',
      status,
      timestamp: new Date()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get hiring dashboard data
router.get('/dashboard/:recruiterId', async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId })

    const dashboardData = {
      totalJobs: jobs.length,
      openJobs: jobs.filter((j) => j.status === 'open').length,
      closedJobs: jobs.filter((j) => j.status === 'closed').length,
      totalApplications: jobs.reduce((sum, job) => sum + job.applications.length, 0),
      statusBreakdown: {
        applied: 0,
        shortlisted: 0,
        interviewed: 0,
        offered: 0
      }
    }

    jobs.forEach((job) => {
      job.applications.forEach((app) => {
        dashboardData.statusBreakdown[app.status]++
      })
    })

    res.json(dashboardData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
