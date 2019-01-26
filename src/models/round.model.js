
import mongoose from 'mongoose'

/**
 * Round Schema
 */
const RoundSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true
  },
  participants: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Round', RoundSchema)
