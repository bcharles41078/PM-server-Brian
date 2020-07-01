const express = require('express')
const ProjectsService = require('./projects-service')

const ProjectsRouter = express.Router()

// ProjectsRouter
//   .route('/')
//   .get((req, res, next) => {
//     ProjectsService.getAllTypes(req.app.get('db'))
//       .then(proj => {
//         res.json(proj.map(ProjectsService.serializeProjects))
//       })
//       .catch(next)
//   })

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
