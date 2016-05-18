var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Outfttr', message: req.flash() });  // add the message
});

// GET /home
router.get('/home', function(req, res, next) {
  res.render('home.ejs', { message: req.flash() });
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  console.log('req.body', req.body);
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/items',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/items',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// GET /contact
router.get('/contact', function(req, res, next) {
  res.render('contact.ejs', { message: req.flash() });
});

// GET /about
router.get('/about', function(req, res, next) {
  res.render('about.ejs', { message: req.flash() });
});

// Restricted page
router.get('/secret', function(req, res, next) {
  if (currentUser) {
    res.render('secret.ejs');
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;
