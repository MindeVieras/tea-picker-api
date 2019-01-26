
import Member from '../models/member.model'
import Round from '../models/round.model'

import { jsonResponse } from '../helpers'

/**
 * Get tea maker.
 * @property {Array} req.body.participants - List of participants.
 * @returns {Maker}
 */
export function picker(req, res, next) {

  let countParticipants = req.body.participants.length

  // Read all member that are seved on db
  Member.find({'name': { $in: req.body.participants}})
    .then(members => {
      let countMembers = members.length
      jsonResponse.success(res, members)
    })
    .catch(e => next(e))

}
