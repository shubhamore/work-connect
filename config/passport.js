const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const ClientUser = require('../models/Client');
const WorkerUser = require('../models/worker');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
      // Match user
      ClientUser.findOne({
        name: name,
        password :password
      }).then(user => {
        if (!user) {
          // return done(null, false, { message: 'That User is not registered' });
          WorkerUser.findOne({
            name: name,
            password :password
          })
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};