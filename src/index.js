
// import 'babel-polyfill'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import app from './config/express'
import routes from './routes/index.route'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

// connect to mongo db
const mongoUri = process.env.MONGO_HOST
mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.connection.on('error', () => {
  console.error('Could not connect to database')
})

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

// APIDoc route
app.use('/apidoc', express.static(path.join(__dirname, '../apidoc')))

// API routes
app.use('/api', routes)

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`)
})

export default app