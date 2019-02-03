
import HttpStatus from 'http-status'
import validator from 'validator'

import Member from '../models/member.model'
import { jsonResponse, APIError } from '../helpers'

/**
 * Get member list.
 * @returns {Member[]}
 */
export function list(req, res, next) {

  Member.find({})
    .sort({ createdAt: -1 }) // sort by newest members
    .then(members => jsonResponse(res, members))
    .catch(e => next(e))

}

/**
 * Create new member.
 * @property {string} req.body.name - The name of member.
 * @property {string} req.body.email - The email of member.
 * @returns {Member}
 */
export function create(req, res, next) {
  
  let errors = validateErrors(req.body)
  
  // return errors if any
  if (errors) throw new APIError(errors)

  else {
    // to be saved to db
    let memberData = {
      ...req.body,
      name_lc: req.body.name.toLowerCase()
    }

    const memberClass = new Member(memberData)
    
    // Check if user with the same name exists - lowercase
    Member.findOne({name_lc: memberData.name_lc})
      .then(member => {

        if (member)
          throw new APIError({ name: 'Member name already taken' })
        
        return memberClass.save()
      })
      .then(member => jsonResponse(res, member, HttpStatus.CREATED))
      .catch(e => next(e))
  }
    
}

/**
 * Get member.
 * @param {string} req.params.id - The id of member.
 * @returns {Member}
 */
export function get(req, res, next) {

  const { id } = req.params

  Member.findById(id)
    .then(member => {
      if (!member)
        throw new APIError('Member not found', HttpStatus.NOT_FOUND)
      else
        jsonResponse(res, member)

    })
    .catch(e => next(e))

}

/**
 * Update member.
 * @param {string} req.params.id - The id of member.
 * @property {string} req.body.name - The name of member.
 * @property {string} req.body.email - The email of member.
 * @returns {Member}
 */
export function update(req, res, next) {
  
  const { id } = req.params

  let errors = validateErrors(req.body)
  
  // return errors if any
  if (errors) throw new APIError(errors)

  else {
    // to be saved to db
    let memberData = {
      ...req.body,
      name_lc: req.body.name.toLowerCase()
    }
    
    // Check if user with the same name exists - lowercase
    Member.findOne({name_lc: memberData.name_lc})
      .then(member => {
        
        if (member && id != member._id)
          throw new APIError({ name: 'Member name already taken' })
        
        return Member.findByIdAndUpdate(id, {$set: memberData}, { new: true })
      })
      .then(member => jsonResponse(res, member))
      .catch(e => next(e))
  }

}

/**
 * Delete member.
 * @param {string} req.params.id - The id of member.
 * @returns {Member}
 */
export function remove(req, res, next) {
  
  const { id } = req.params

  Member.findByIdAndRemove(id)
    .then(member => jsonResponse(res, member))
    .catch(e => next(e))

}

function validateErrors(values) {

  const { name, email } = values
  let errors

  // validate member name input
  if (!name || validator.isEmpty(name))
    errors = { ...errors, name: `Member name is required` }

  // vlaidate email
  if (email && !validator.isEmail(email))
    errors = { ...errors, email: `Email must be valid` }
  
  return errors

}
