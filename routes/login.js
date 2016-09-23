const express = require('express')
const router = express.Router()
const Model = require('../models/user')

router
  .post('/', function (req, res, next) {
    var name = req.body.name
    var pass = req.body.pass
    Model.find({$and:[{name: name}, {pass: pass}]})
    .exec(function (err, user) {
      if (err) {
        console.log(err)
        res.render('error', {
          message: err.message,
          error: err
        })
        next(err)
      }
      else {
        res.send(user)
      }
    })
  })
  .get('/', function (req, res, next) {
    res.sendfile('public/forms/login.html')
    // res.sendfile('public/index.html')
    // next()
  })

module.exports = router
