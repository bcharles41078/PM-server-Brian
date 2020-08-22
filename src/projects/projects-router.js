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
  .route('/')
  .delete(requireAuth, jsonBodyParser, (req, res) => {
    ProjectsService.deleteProjectById(
      req.app.get('db'),
      req.body.detail_id
    ).then(result => {
      res.status('204').send()
    })
      .catch(error => { alert(error.error) })
  })

ProjectsRouter
  .route('/')
  .patch(requireAuth, jsonBodyParser, (req, res) => {
    updatedProject = {
      project_title: req.body.project_title,
      project_description: req.body.project_description,
      due_date: req.body.due_date
    }
    ProjectsService.updateProject(
      req.app.get('db'),
      req.body.detail_id,
      updatedProject
       
    ).then(result => {
      res.status('204').send()
    })
      .catch(next)
  })

ProjectsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, async (req, res, next) => {
    const { project_title, project_description, due_date } = req.body
    const newProject = { project_title, project_description, due_date, user_id: req.user.id }
    await ProjectsService.insertProject(req.app.get('db'), newProject)

    for (const [key, value] of Object.entries(newProject)) {
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    }
    res.status(201).send()
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
