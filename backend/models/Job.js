import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    company: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    requiredSkills: [String],
    minGPA: {
      type: Number,
      default: 6.0
    },
    maxBacklogs: {
      type: Number,
      default: 0
    },
    allowedBranches: [String],
    location: String,
    jobType: {
      type: String,
      enum: ['full-time', 'internship', 'contract'],
      default: 'full-time'
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    deadline: Date,
    status: {
      type: String,
      enum: ['open', 'closed', 'on-hold'],
      default: 'open'
    },
    applications: [
      {
        studentId: mongoose.Schema.Types.ObjectId,
        status: {
          type: String,
          enum: ['applied', 'shortlisted', 'interviewed', 'offered', 'rejected'],
          default: 'applied'
        },
        appliedAt: Date,
        aiMatchScore: Number,
        interviewScore: Number,
        notes: String
      }
    ],
    postedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export default mongoose.model('Job', jobSchema)
