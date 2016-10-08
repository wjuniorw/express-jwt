const express = require('express')
const router = express.Router()
const Model = require('../models/user')
const validToken = require('../config/valid-token')

/* GET users list */
router.get('/', validToken, function(req, res, next) {
  Model.find({}, function (err, users) {
    if (err) {
      console.log(err)
      next(err)
    }
    else {
      if (req.user) {
        res.send(users)
      }
    }
  })
})

module.exports = router
