const express = require('express')
const ProjectsService = require('./projects-service')

const ProjectsRouter = express.Router()

ProjectsRouter
  .route('/')
  .get((req, res, next) => {
    let type_id = req.query.type_id
    let user_id = req.query.user_id
console.log(type_id)
    ProjectsService.getProjectsForTypes(req.app.get('db'), type_id, user_id)
      .then(proj => {
        console.log(proj)
        res.json(proj.map(ProjectsService.serializeProjects))
      })
      .catch(next)
    // res.json({})
  })

ProjectsRouter
  .route('/:detail_id')
  .all(checkProjectExists)
  .get((req, res) => {
    ProjectsService.getById(
      req.app.get('db'),
      req.params.detail_id
    ) .then( result => {
      res.json(ProjectsService.serializeProjects(result))
    })
    
  })

/* async/await syntax for promises */
async function checkProjectExists(req, res, next) {
  try {
    const project = await ProjectsService.getById(
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
