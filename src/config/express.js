
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

// Require variables from .env file if available
require('dotenv').config()

// Logger
app.use(morgan('dev'))

// CORS
app.use(cors())

// Parse body params and add to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
