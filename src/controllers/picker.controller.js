
import HttpStatus from 'http-status'

import Member from '../models/member.model'
import Round from '../models/round.model'

import { jsonResponse } from '../helpers'
import APIError from '../helpers/APIError'

/**
 * Get tea maker.
 * @property {Array} req.body.participants - List of participants.
 * @returns {Maker}
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
      .then(round => jsonResponse(res, round))
      .catch(e => next(e))

  }
  else {
    const err = new APIError('No members in the list', HttpStatus.UNPROCESSABLE_ENTITY)
    return next(err)
  }

}
