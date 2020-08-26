const express = require('express')
const StepsService = require('./steps-service')
const { requireAuth } = require('../middleware/jwt-auth');
const { userFromAuth } = require('../middleware/user_from_auth');

const jsonBodyParser = express.json()
const StepsRouter = express.Router()

StepsRouter
    .route('/')
    .get(requireAuth, async (req, res, next) => {
        try {
            const steps = await StepsService.getAllSteps(
                req.app.get('db'),
                req.user.id
            );
            res.status(200).json(
                steps.map(step => ProjectsService.serializeSteps(step))
            );

        } catch (error) {
            next(error);
        }
    })