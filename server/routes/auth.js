const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // adjust the path as necessary
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username })
        .then(user => {
          if (!user) { return done(null, false); }
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
          });
        })
        .catch(err => done(err));
    }
  ));

  router.post('/signup', function(req, res) {
    User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        res.redirect('/signup');
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
          if (err) {
            res.json({ error: err });
          }
      
          let user = new User({
            username: req.body.username,
            password: hashedPass
          });
      
          user.save()
          .then(user => {
            res.redirect('/login');
          })
          .catch(error => {
            res.redirect('/signup');
          });
        });
      }
    })
    .catch(error => {
      res.redirect('/signup');
    });
  });
  
  router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Invalid username or password.' }), 
  function(req, res) {
    res.redirect('/dashboard');
  }
);

router.get('/logout', function(req, res){
    req.logout(() => {
      res.redirect('/login');
    });
  });

module.exports = router;