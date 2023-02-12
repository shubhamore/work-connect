const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const ClientUser = require('../models/Client');
const WorkerUser = require('../models/worker');
var a=0;
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ nameField: 'name' }, (name, password, done) => {
      // Match user
      ClientUser.findOne({
        name: name,
      }).then(user => {
        if (!user) {
          // return done(null, false, { message: 'That User is not registered' });
          WorkerUser.findOne({
            name: name
          }).then(worker=>{
            if (!worker) {
              return done(null, false, { message: 'That User is not registered' });
            }
            bcrypt.compare(password, worker.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                a=1;
                return done(null, worker);
              } else {
                return 
              }
            });
          })
        }
        else{
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              a=2;
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
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