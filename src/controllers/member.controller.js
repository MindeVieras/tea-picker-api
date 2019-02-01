
import HttpStatus from 'http-status'
import validator from 'validator'

import Member from '../models/member.model'
import { jsonResponse } from '../helpers'
import APIError from '../helpers/APIError'

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
  
  const { name, email } = req.body
  let errors

  // validate member name input
  if (!name || validator.isEmpty(name))
    errors = { ...errors, name: `Member name is required` }

  // vlaidate email
  if (email && !validator.isEmail(email))
    errors = { ...errors, email: `Email must be valid` }
  
  // return errors if any
  if (errors)
    throw new APIError(errors)

  else {
    // to be sent to db
    let memberData = {
      name,
      name_lc: name.toLowerCase(),
      email
    }

    const memberClass = new Member(memberData)
    
    // Check if user with the same name exists - lowercase
    Member.findOne({name_lc: memberData.name_lc})
      .then(member => {
        
        if (member) {
          throw new APIError({ name: 'Member name already taken' })
        }
        
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
      if (!member) {
        throw new APIError('Member not found', HttpStatus.NOT_FOUND)
      }
      else {
        jsonResponse(res, member)
      }
    })
    .catch(e => {
      const err = new APIError('Member not found', HttpStatus.NOT_FOUND)
      return next(err)
    })

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

  Member.findByIdAndUpdate(id, {$set: req.body}, { new: true })
    .then(member => jsonResponse(res, member))
    .catch(e => next(e))

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
