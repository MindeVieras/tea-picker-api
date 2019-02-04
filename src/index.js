
import mongoose from 'mongoose'
import HttpStatus from 'http-status'

import app from './config/express'
import routes from './routes/index.route'

const production = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

// connect to mongo db
const mongoUri = process.env.MONGODB_URI
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
  
  // Set staus code to app response
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
  
  res.send(body)

})

// Handle 404 errors
app.use((req, res, next) => {

  const status = HttpStatus.NOT_FOUND

  // Set staus code to app response
  res.statusCode = status

  const body = {
    status,
    message: 'API not found'  
  }
  res.send(body)
  return
})

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`)
})

export default app
