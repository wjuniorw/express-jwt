const mongoose = require('mongoose')
const jwt = require('jwt-simple')
const secret = 'secrettomyhash'
const UserSchema = new mongoose.Schema({
  name: String,
  pass: String
})

UserSchema.pre('save', function (next) {
  // encriptar senha
  var hash = jwt.encode(this.pass, secret)
  this.pass = hash
  next()
})

UserSchema.methods.comparePass = function (pass, next) {
  var userPass = jwt.decode(this.pass, secret)
  if (userPass === pass) {
    next(true)
  }
  else {
    next(false)
  }
}

var User = mongoose.model('User', UserSchema)
module.exports = User
