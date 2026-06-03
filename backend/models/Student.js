import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    gpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    registrarGpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    backlogs: {
      type: Number,
      default: 0
    },
    branch: {
      type: String,
      required: true
    },
    graduationYear: {
      type: Number,
      required: true
    },
    skills: [String],
    resume: {
      filename: String,
      url: String,
      uploadedAt: Date,
      aiScore: Number,
      parsedData: {
        education: [
          {
            institution: String,
            degree: String,
            field: String,
            graduationYear: Number
          }
        ],
        experience: [
          {
            company: String,
            position: String,
            duration: String,
            description: String
          }
        ],
        skills: [String],
        projects: [
          {
            name: String,
            description: String,
            technologies: [String]
          }
        ]
      }
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'flagged'],
      default: 'pending'
    },
    applicationHistory: [
      {
        jobId: mongoose.Schema.Types.ObjectId,
        status: {
          type: String,
          enum: ['applied', 'shortlisted', 'interviewed', 'offered', 'rejected'],
          default: 'applied'
        },
        appliedAt: Date,
        scores: {
          aiMatchScore: Number,
          interviewScore: Number
        }
      }
    ],
    placementStatus: {
      type: String,
      enum: ['unplaced', 'placed'],
      default: 'unplaced'
    },
    placedIn: {
      company: String,
      package: String,
      position: String,
      offerDate: Date
    }
  },
  { timestamps: true }
)

export default mongoose.model('Student', studentSchema)
