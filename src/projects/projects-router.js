const express = require('express')
const ProjectsService = require('./projects-service')
const { requireAuth } = require('../middleware/jwt-auth');
const { userFromAuth } = require('../middleware/user_from_auth');

const jsonBodyParser = express.json()
const ProjectsRouter = express.Router()


ProjectsRouter
  .route('/')
  .get(requireAuth, async (req, res, next) => {
    try {
      const projects = await ProjectsService.getAllProjects(
        req.app.get('db'),
        req.user.id
      );
      res.status(200).json(
       projects.map(project => ProjectsService.serializeProjects(project))
      );

    } catch (error) {
      next(error);
    }
  })


ProjectsRouter
  .route('/:detail_id')
  .all(checkProjectExists)
  .get((req, res) => {
    ProjectsService.getById(
      req.app.get('db'),
      req.params.detail_id
    ).then(result => {
      res.json(ProjectsService.serializeProjects(result))
    })

  })

ProjectsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, async (req, res, next) => {
    console.log(req.body, req.user)
    const { project_title, project_description, due_date, list_id} = req.body
    const newProject = { project_title, project_description, due_date, list_id, user_id:req.user.id }
    console.log(newProject)
    await ProjectsService.insertProject(req.app.get('db'), newProject)

    for (const [key, value] of Object.entries(newProject)) {
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    }
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
