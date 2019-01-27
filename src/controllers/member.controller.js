
import validator from 'validator'

import Member from '../models/member.model'
import { jsonResponse } from '../helpers'

/**
 * Get member list.
 * @returns {Member[]}
 */
export function list(req, res, next) {

  Member.find({})
    .then(members => jsonResponse.success(res, members))
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
  if (errors) {
    jsonResponse.error(res, {message: 'Input error', errors})
  }

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
      
      if (member)
        throw 'Already taken'
      
      return memberClass.save()
    })
    .then(member => jsonResponse.success(res, member))
    .catch(e => next(e))
    
}

/**
 * Get member.
 * @param {string} req.params.id - The id of member.
 * @returns {Member}
 */
export function get(req, res, next) {

  const { id } = req.params

  Member.findById(id)
    .then(member => jsonResponse.success(res, member))
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

  Member.findByIdAndUpdate(id, {$set: req.body}, { new: true })
    .then(member => jsonResponse.success(res, member))
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
    .then(member => jsonResponse.success(res, member))
    .catch(e => next(e))

}
