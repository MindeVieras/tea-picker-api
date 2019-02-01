
import mongoose from 'mongoose'

/**
 * Round Schema
 */
const RoundSchema = new mongoose.Schema({
  maker: {
    type: String,
    required: true
  },
  participants: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Round', RoundSchema)
