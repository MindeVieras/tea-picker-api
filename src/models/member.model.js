
import mongoose from 'mongoose'

/**
 * Member Schema
 */
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, '{VALUE} is not valid email.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Member', MemberSchema)
