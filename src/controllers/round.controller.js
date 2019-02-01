
import Round from '../models/round.model'

import { jsonResponse } from '../helpers'

/**
 * Get round list.
 * @returns {Round[]}
 */
export function list(req, res, next) {

  Round.find({})
    .sort({ createdAt: -1 }) // Sort by the latest item
    .then(rounds => jsonResponse.success(res, rounds))
    .catch(e => next(e))

}

/**
 * Get round.
 * @param {string} req.params.id - The id of round.
 * @returns {Round}
 */
export function get(req, res, next) {

  const { id } = req.params

  Round.findById(id)
    .then(round => jsonResponse.success(res, round))
    .catch(e => next(e))

}

/**
 * Delete round.
 * @param {string} req.params.id - The id of round.
 * @returns {Round}
 */
export function remove(req, res, next) {
  
  const { id } = req.params

  Round.findByIdAndRemove(id)
    .then(round => jsonResponse.success(res, round))
    .catch(e => next(e))

}
