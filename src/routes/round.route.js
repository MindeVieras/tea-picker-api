
import express from 'express'

import { list, create, get, remove } from '../controllers/round.controller'

const router = express.Router()

/** GET /api/rounds - Get list of rounds */
router.get('/', list)

/** POST /api/rounds - Create new round */
router.post('/', create)

/** GET /api/rounds/:id - Get single round */
router.get('/:id', get)

/** DELETE /api/rounds/:id - Delete round */
router.delete('/:id', remove)

export default router
