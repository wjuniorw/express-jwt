const express = require('express')
const router = express.Router()
const Model = require('../models/user')

router
.get('/', function (req, res, next) {
  res.sendfile('public/forms/singup.html')
})
.post('/', function (req, res, next) {
  var name = req.body.name
  var pass = req.body.pass
  // var query = { $regex:[{$param: name, $option: 'i'}] }
  var query = { name:name }
  Model.findOne(query, function (err, us) {
    if (err) {
      console.log(err)
    }
    // console.log(us)
    if (!us) {
      var newUser = new Model({
        name: name,
        pass: pass
      })
      .save(function (e, result) {
        console.log(e)
        res.send(result)
      })
    }
    else {
      console.log(us)
      res.send('user Found')
    }
  })
})

module.exports = router
