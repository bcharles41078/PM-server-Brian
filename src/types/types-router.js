const express = require('express')
const path = require('path')
const typesService = require('./types-service')
const { serializeTypes } = require('../projects/projects-service')

const typesRouter = express.Router()
const jsonBodyParser = express.json()

typesRouter
  .route('/:user_id')
  .get((req, res, next) => {
    typesService.getAllTypes(req.app.get('db'), req.params.user_id)
      .then(types => {
        res.json(types.map(typesService.serializeTypes))
      })
      .catch(next)
  })

  typesRouter
    .route('/')
   .post(jsonBodyParser, (req, res, next) => {
    const { title } = req.body
    const newType = { title }

    for (const [key, value] of Object.entries(newType))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    typesService.insertType(
      req.app.get('db'),
      newType
    )
      .then(newType => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${newType.list_id}`))
          .json(typesService.serializeTypes(newType))
      })
      .catch(next)
  })

module.exports = typesRouter
