
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
  
  const member = new Member(req.body)
  
  member.save()
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
