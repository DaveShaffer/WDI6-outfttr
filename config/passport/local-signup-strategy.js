var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');

var strategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        // A user with this email already exists
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else {
        // Create a new user
        var newUser            = new User();
        newUser.local.email    = email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err) {
          return callback(err, newUser);
        });
      }
    });
  });

module.exports = strategy;
