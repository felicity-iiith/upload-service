var config = require('./config')

module.exports = function (req, res, next) {
  var userinfo = req.get('x-userinfo');
  if (process.env.NODE_ENV !== 'production') userinfo = '{ "username" : "admin" }'
  var username = JSON.parse(userinfo).username;
  if (config.admins.indexOf(username) != -1) return next();
  else res.sendStatus(403)
}
