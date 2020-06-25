const express = require('express')
const ProjectService = require('./projects-service')

const ProjectsRouter = express.Router()

ProjectsRouter
  .route('/')
  .get((req, res, next) => {
    ProjecttAllTypes(req.app.get('db'))
      .then(proj => {
        res.json(proj.map(ProjectrializeProject))
      })
      .catch(next)
  })

ProjectsRouter
  .route('/:detail_id')
  .all(checkProjectExists)
  .get((req, res) => {
    res.json(ProjectsService.serializeProject(res.title))
  })

/* async/await syntax for promises */
async function checkProjectExists(req, res, next) {
  try {
    const project = await ProjecttById(
      req.app.get('db'),
      req.params.detail_id
    )

    if (!project)
      return res.status(404).json({
        error: `Project doesn't exist`
      })

    res.project = project
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = ProjectsRouter
