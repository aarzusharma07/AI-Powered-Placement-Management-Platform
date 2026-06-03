import express from 'express'
import Job from '../models/Job.js'

const router = express.Router()

// Get all active jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' }).sort({ postedAt: -1 })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get job by ID
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search jobs by skills or title
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query

    const jobs = await Job.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { requiredSkills: { $in: [new RegExp(query, 'i')] } },
        { description: { $regex: query, $options: 'i' } }
      ],
      status: 'open'
    })

    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
