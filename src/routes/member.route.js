
import express from 'express'

import { list, create, get, update, remove } from '../controllers/member.controller'

const router = express.Router()

/** GET /api/members - Get list of members */
router.get('/', list)

/** POST /api/members - Create new member */
router.post('/', create)

/** GET /api/members/:id - Get single member */
router.get('/:id', get)

/** PUT /api/members/:id - Update member */
router.put('/:id', update)

/** DELETE /api/members/:id - Delete member */
router.delete('/:id', remove)

export default router
