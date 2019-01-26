
import express from 'express'

import { picker } from '../controllers/picker.controller'

import memberRoutes from './member.route'
import roundRoutes from './round.route'

const router = express.Router()

/** POST /api/picker - Send list of participants and get lucky member who makes tea */
router.post('/picker', picker)

/** GET|POST|PUT|DELETE /api/members - Members crud routes */
router.use('/members', memberRoutes)

/** GET|POST|DELETE /api/rounds - Rounds crud routes */
router.use('/rounds', roundRoutes)

export default router
