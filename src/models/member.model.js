
import mongoose from 'mongoose'

/**
 * Member Schema
 */
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  /**
   * name_lc field is for lower case version of name field,
   * since project requires api for quering members by name
   * it will help to achieve performance when database object grows up.
  */
  name_lc: {
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
