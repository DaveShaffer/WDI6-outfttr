var express = require('express');
var router = express.Router();
var Outfit = require('../models/outfit');
var Item = require('../models/item');

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
  var outfits = global.currentUser.outfits;
  var items = global.currentUser.items;
  res.render('outfits/index', { outfits: outfits, items: items });
});

router.get('/new', authenticate, function(req, res, next) {
    var outfit = {
      name: ''
    };
    res.render('outfits/new', { outfit: outfit });
});

/// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  var items = global.currentUser.items;
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  res.render('outfits/show', { outfit: outfit, items: items } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var outfit = {
      name: req.body.name
    };
    currentUser.outfits.push(outfit);
    currentUser.save()
        .then(function() {
            res.redirect('/outfits');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var outfits = currentUser.outfits.id(req.params.id);
    if(!outfit) return next(makeError(res, 'Document not found', 404));
    res.render('outfits/edit', { outfit: outfit });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  console.log('req.query:', req.query);
  Item.findById(req.query.item)
    .then(function(item){
      console.log('item:', item);
      outfit.name = req.body.outfit;
      item = req.body.prompt;
    });
    outfit.save()
  //  if(!outfit) return next(makeError(res, 'Document not found', 404));
   // else{
         //   outfit.name = req.body.outfit;
           // currentUser.outfit.items.push(item);
           // currentUser.save()
            .then(function(saved){
               res.redirect('/outfits');
           }, function(err){
               return next(err)
            });
  });
// });


// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.outfits.indexOf(outfit);
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
