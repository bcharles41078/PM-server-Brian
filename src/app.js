require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const projectsRouter = require('./projects/projects-router')
const authRouter = require('./auth/auth-router')
const stepsRouter = require('./steps/steps-router')
const notesRouter = require('./notes/notes-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use('/api/projects', projectsRouter)
app.use('/api/auth', authRouter)
app.use('/api/steps', stepsRouter)
app.use('/api/notes', notesRouter)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app
