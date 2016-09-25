const jwt = require('jwt-simple')
const Model = require('../models/user')
const secret = 'simpleAuthJWT'
const validate = function (req, res, next) {
  // var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  var token = req.body.token || req.headers['x-access-token']
  if (token) {
    var decoded = jwt.decode(token, secret)
    var expired = decoded.exp <= Date.now()
    var current = decoded.exp > Date.now()
    switch (decoded) {
      case expired:
        res.send({error: 'Acesso Expirado, faça login novamente'})
        break;
      case current:
        Model.findOne({_id: decoded.iss})
        .exec(function (err, user) {
          // user
          // ? req.user = user next()
          // : req.user = '' next()
          if (err) {
            res.send({erro: err})
            next(err)
            req.user = ''
          }
          else {
            req.user = user
            next()
          }
        })
        break
      default:
        res.send({error: 'Token invalido!!!'})
    }//fim do switch
  }
  else {
    // token errado...
    res.send({error: 'Token não informado!!!'})
  }
}
module.exports = validate
