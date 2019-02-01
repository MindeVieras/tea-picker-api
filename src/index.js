
import mongoose from 'mongoose'
import HttpStatus from 'http-status'
import expressValidation from 'express-validation'

import app from './config/express'
import routes from './routes/index.route'
import APIError from './helpers/APIError'

const production = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

// connect to mongo db
const mongoUri = process.env.MONGO_HOST
mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.connection.on('error', () => {
  console.error('Could not connect to database')
})

// API routes
app.use('/api', routes)

// Error handling middleware
app.use((err, req, res, next) => {
  
  const status = err.status || 500
  
  if (status < 400) status = 500
  
  // Set staus code for response
  res.statusCode = status

  let body = {
    status: status
  }

  // show the stacktrace when not in production
  if (!production)
    body.stack = err.stack

  // internal server errors
  if (status >= 500) {
    console.error(err.stack)
    body.message = HttpStatus[status]
    res.send(body)
    return
  }

  // client errors
  body.message = err.message
  body.errors = err.errors

  if (err.code) body.code = err.code
  if (err.name) body.name = err.name
  if (err.type) body.type = err.type
  
  res.send(body)
})

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // Start HTTP server
  app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
  })
}


module.exports = app
