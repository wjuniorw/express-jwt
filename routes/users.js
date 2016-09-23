const express = require('express')
const router = express.Router()
const Model = require('../models/user')
// const auth = require('../models/user')

/* GET users list */
router.get('/', function(req, res, next) {
  Model.find({})
  .exec(function (err, users) {
    res.send(users)
  })
})

module.exports = router
