
import Member from '../models/member.model'

import { jsonResponse } from '../helpers'

/**
 * Get member list.
 * @returns {Member[]}
 */
export function list(req, res) {

  Member.find({})
    .then(members => jsonResponse.success(res, members))
    .catch(e => jsonResponse.error(res, e))

}

/**
 * Create new member.
 * @property {string} req.body.name - The name of member.
 * @property {string} req.body.email - The email of member.
 * @returns {Member}
 */
export function create(req, res) {
  
  const member = new Member(req.body)
  
  member.save()
    .then(savedMember => jsonResponse.success(res, savedMember))
    .catch(e => jsonResponse.error(res, e))
    
}

/**
 * Get member.
 * @property {string} req.params.id - The id of member.
 * @returns {Member}
 */
export function get(req, res) {

  const { id } = req.params

  Member.findById(id)
    .then(member => jsonResponse.success(res, member))
    .catch(e => jsonResponse.error(res, e))

}

/**
 * Update member.
 * @property {string} req.params.id - The id of member.
 * @property {string} req.body.name - The name of member.
 * @property {string} req.body.email - The email of member.
 * @returns {Member}
 */
export function update(req, res) {

  const { id } = req.params

  Member.findByIdAndUpdate(id, {$set: req.body}, { new: true })
    .then(member => jsonResponse.success(res, member))
    .catch(e => jsonResponse.error(res, e))

}

/**
 * Delete member.
 * @property {string} req.params.id - The id of member.
 * @returns {Member}
 */
export function remove(req, res) {
  
  const { id } = req.params

  Member.findByIdAndRemove(id)
    .then(member => jsonResponse.success(res, member))
    .catch(e => jsonResponse.error(res, e))

}
