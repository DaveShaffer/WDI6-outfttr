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

function getItems(outfit) {
  // convert itemIds from the items in the outfit into the full item objects
  var items = [];
  outfit.items.forEach(function(itemId) {
    var item = currentUser.items.id(itemId);
    items.push(item);
  });
  return items;
}

function getItemsToAdd(outfit) {
  // Only show items that are not already in the outfit
  var itemsToAdd = [];
  currentUser.items.forEach(function(item) {
    if (outfit.items.indexOf(item._id) === -1) {
      itemsToAdd.push(item);
    }
  });
  return itemsToAdd;
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  var outfits = global.currentUser.outfits;
  res.render('outfits/index', { outfits: outfits });
});

//NEW
router.get('/new', authenticate, function(req, res, next) {
    var outfit = {
      name: ''
    };
    res.render('outfits/new', { outfit: outfit });
});

/// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  res.render('outfits/show', { outfit: outfit, items: getItems(outfit) } );
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
  var outfit = currentUser.outfits.id(req.params.id);
  if (!outfit) return next(makeError(res, 'Document not found', 404));
  res.render('outfits/edit', { outfit: outfit,
                               items: getItems(outfit),
                               itemsToAdd: getItemsToAdd(outfit) });
});


// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var outfit = currentUser.outfits.id(req.params.id);
  var item = currentUser.items.id(req.body.itemid);
  console.log("this is the outfit", outfit);
  console.log("this is the item", item);
  outfit.items.push(item);
  currentUser.save()
  .then(function(saved) {
     res.redirect('/outfits');
  }, function(err) {
      return next(err)
  });
});

  //  if(!outfit) return next(makeError(res, 'Document not found', 404));
   // else{
         //   outfit.name = req.body.outfit;
           // currentUser.outfit.items.push(item);
           // currentUser.save()
  //           .then(function(saved){
  //              res.redirect('/outfits');
  //          }, function(err){
  //              return next(err)
  //           });
  // });
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
