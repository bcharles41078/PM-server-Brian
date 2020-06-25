const express = require('express')
const path = require('path')
const typesService = require('./types-service')

const typesRouter = express.Router()
const jsonBodyParser = express.json()

typesRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const { title, user_id } = req.body
    const newType = { title, user_id }

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
          .location(path.posix.join(req.originalUrl, `/${type.list_id}`))
          .json(TypesService.serializeTypes(type))
      })
      .catch(next)
    })

module.exports = typesRouter
