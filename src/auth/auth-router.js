const express = require('express')
const AuthService = require('./auth-service')
const UsersService = require('../users/users-service')
const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/user', jsonBodyParser, (req, res, next) => {
    const { user_name, full_name, nickname, password } = req.body
    const regUser = { user_name, full_name, nickname, password }

    for (const [key, value] of Object.entries(regUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    //see if account is already there
    AuthService.getUserWithUserName(
      req.app.get('db'),
      regUser.user_name
    )
      .then(dbUser => {
        if (dbUser) {
          return res.status(400).json({
            error: 'User name already exisits',
          })
        }
      })
      .then(dbUser => {
        //hash password
        return AuthService.hashPasswords(
          regUser.password
        )
      })
      .then(hashedPw => {
        //using that create the account
        return UsersService.insertUser(
          req.app.get('db'),
          {
            full_name: regUser.full_name,
            nickname: regUser.nickname,
            user_name: regUser.user_name,
            password: hashedPw,
          }
        )
      })
      .then(data => {
        res.status(201).send()
      })
      .catch(next)


    //sign in and send back jwt token
    // createJwt(

    // )

  })
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }

    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        if (!dbUser) {
          return res.status(400).json({
            error: 'Incorrect user_name or password',
          })
        }

        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch) {
              return res.status(400).json({
                error: 'Incorrect user_name or password',
              })
            }

            const sub = dbUser.user_name
            const payload = { user_id: dbUser.id }
            return res.send({
              authToken: AuthService.createJwt(sub, payload),
            })
          })
      })
      .catch(next)

  })

module.exports = authRouter