import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'interviewed', 'offered', 'rejected', 'accepted', 'declined'],
      default: 'applied'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100
    },
    matchDetails: {
      skillsMatch: [
        {
          skill: String,
          studentHas: Boolean,
          requiredLevel: String
        }
      ],
      gpaMatch: Boolean,
      backlogMatch: Boolean,
      branchMatch: Boolean
    },
    interviewSchedule: {
      scheduledDate: Date,
      scheduledTime: String,
      interviewType: {
        type: String,
        enum: ['technical', 'hr', 'both'],
        default: 'technical'
      },
      interviewScore: Number,
      feedback: String
    },
    offer: {
      extended: Boolean,
      salary: String,
      offerDate: Date,
      expiryDate: Date,
      accepted: Boolean,
      acceptedDate: Date
    },
    notes: String
  },
  { timestamps: true }
)

export default mongoose.model('Application', applicationSchema)
