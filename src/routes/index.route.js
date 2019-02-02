
import express from 'express'

import memberRoutes from './member.route'
import roundRoutes from './round.route'

const router = express.Router()

/** GET|POST|PUT|DELETE /api/members - Members crud routes */
router.use('/members', memberRoutes)

/** GET|POST|DELETE /api/rounds - Rounds crud routes */
router.use('/rounds', roundRoutes)

export default router
