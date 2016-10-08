const express = require('express')
const router = express.Router()
const Model = require('../models/user')
const moment = require('moment')
const jwt = require('jwt-simple')
const secret = 'mySession'

router
  .post('/', function (req, res, next) {
    var name = req.body.name
    var pass = req.body.pass
    Model.findOne({name: name}, function (err, user) {
      if (err) {
        console.log(err)
        res.render('error', {
          message: err.message,
          error: err
        })
        next(err)
      }
      else {
        user.comparePass(pass, function (isUser) {
          if (isUser) {
            var expires = moment().add(30, 'minutes').valueOf()
            var token = jwt.encode({
              iss: user._id,
              exp: expires
            }, secret)
            res.send({
              token: token,
              user: user
            })
          }
          else {
            console.log(isUser)
            res.send('incorrect password !')
          }
        })
      }
    })
  })
  .get('/', function (req, res, next) {
    res.sendfile('public/forms/login.html')
    // res.sendfile('public/index.html')
    // next()
  })

module.exports = router
