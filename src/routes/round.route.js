
import express from 'express'

import { picker, list, get, remove } from '../controllers/round.controller'

const router = express.Router()

/** POST /api/rounds/picker - Send list of participants and get lucky member who makes tea */
router.post('/picker', picker)

/** GET /api/rounds - Get list of rounds */
router.get('/', list)

/** GET /api/rounds/:id - Get single round */
router.get('/:id', get)

/** DELETE /api/rounds/:id - Delete round */
router.delete('/:id', remove)

export default router
