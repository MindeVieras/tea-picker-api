
import HttpStatus from 'http-status'

import Round from '../models/round.model'

import { jsonResponse } from '../helpers'
import APIError from '../helpers/APIError'

/**
 * Get round list.
 * @returns {Round[]}
 */
export function list(req, res, next) {

  Round.find({})
    .sort({ createdAt: -1 }) // Sort by the latest item
    .then(rounds => jsonResponse(res, rounds))
    .catch(e => next(e))

}

/**
 * Get tea maker.
 * @property {Array} req.body.participants - List of participants.
 * @returns {RoundPicker}
 */
export function picker(req, res, next) {

  const { participants } = req.body

  // Validate participants array
  if (participants && participants.length > 0) {
    
    // Pick random tea maker from participans list
    const randomMaker = participants[Math.floor(Math.random() * participants.length)]

    // Save round to database
    const round = new Round({ maker: randomMaker, participants })
    round.save()
      .then(r => jsonResponse(res, round))
      .catch(e => next(e))

  }
  else {
    const err = new APIError('No members in the list', HttpStatus.UNPROCESSABLE_ENTITY)
    return next(err)
  }

}

/**
 * Get round.
 * @param {string} req.params.id - The id of round.
 * @returns {Round}
 */
export function get(req, res, next) {

  const { id } = req.params

  Round.findById(id)
    .then(round => {
      if (!round) {
        throw new APIError('Round not found', HttpStatus.NOT_FOUND)
      }
      else {
        jsonResponse(res, round)
      }
    })
    .catch(e => {
      const err = new APIError('Round not found', HttpStatus.NOT_FOUND)
      return next(err)
    })

}

/**
 * Delete round.
 * @param {string} req.params.id - The id of round.
 * @returns {Round}
 */
export function remove(req, res, next) {
  
  const { id } = req.params

  Round.findByIdAndRemove(id)
    .then(round => jsonResponse(res, round))
    .catch(e => next(e))

}
