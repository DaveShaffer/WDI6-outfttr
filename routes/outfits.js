var express = require('express');
var router = express.Router();

var Outfit = require('../models/outfit');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  var todos = global.currentUser.todos;
  res.render('outfits/index', { outfits: outfits, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var todo = {
    title: '',
    completed: false
  };
  res.render('outfits/new', { outfit: outfit, message: req.flash() });
});


/// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  res.render('outfits/show', { outfit: outfit, message: req.flash() } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var outfit = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  // Since a user's outfits are an embedded document, we just need to push a new
  // Outfit to the user's list of outfits and save the user.
  currentUser.outfits.push(item);
  currentUser.save()
  .then(function() {
    res.redirect('/outfits');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  res.render('outfits/edit', { outfit: outfit, message: req.flash() } );
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  else {
    outfit.title = req.body.title;
    outfit.completed = req.body.completed ? true : false;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/todos');
    }, function(err) {
      return next(err);
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.outfits.indexOf(outfits);
  currentUser.outfits.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/outfits');
  }, function(err) {
    return next(err);
  });
});

// TOGGLE completed
router.get('/:id/toggle', authenticate, function(req, res, next) {
  var outfit = currentUser.todos.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  else {
    outfit.completed = !outfit.completed;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/outfits');
    }, function(err) {
      return next(err);
    });
  }
});

module.exports = router;
