const express = require('express')
const NotesService = require('./notes-service')
const { requireAuth } = require('../middleware/jwt-auth');
const { userFromAuth } = require('../middleware/user_from_auth');

const jsonBodyParser = express.json()
const NotesRouter = express.Router()


NotesRouter
  .route('/')
  .get(requireAuth, async (req, res, next) => {
    try {
      const notes = await NotesService.getAllNotes(
        req.app.get('db'),
        req.user.id
      );
      res.status(200).json(
        projects.map(note => NotesService.serializeNotes(note))
      );

    } catch (error) {
      next(error);
    }
  })


ProjectsRouter
  .route('/')
  .delete(requireAuth, jsonBodyParser, (req, res) => {
    NotesService.deleteNoteById(
      req.app.get('db'),
      req.body.note_id
    ).then(result => {
      res.status('204').send()
    })
  },

ProjectsRouter
  .route('/')
  .patch(requireAuth, jsonBodyParser, (req, res) => {
    updatedNote = {
      note: req.body.note
    }
    NotesService.updateNote(
      req.app.get('db'),
      req.body.note_id,
      updatedNote

    ).then(result => {
      res.status('204').send()
    })

  }),

ProjectsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, async (req, res, next) => {
    const { note } = req.body
    const newNote = { note }
    await NotesService.insertNote(req.app.get('db'), newNote)

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    }
    res.status(201).send()
  }),
/* async/await syntax for promises */
async function checkProjectExists(req, res, next) {
  try {
    const project = await NotesService.getById(
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
})

module.exports = ProjectsRouter