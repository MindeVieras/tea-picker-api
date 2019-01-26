
import express from 'express'

import memberRoutes from './member.route'

const router = express.Router()

router.use('/members', memberRoutes)

export default router
