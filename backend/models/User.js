import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'recruiter', 'officer', 'admin'],
      default: 'student'
    },
    company: {
      type: String,
      required: function() {
        return this.role === 'recruiter'
      }
    },
    university: {
      type: String,
      required: function() {
        return this.role === 'student' || this.role === 'officer'
      }
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    profilePicture: String,
    phone: String
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
