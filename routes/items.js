var express = require('express');
var router = express.Router();
var Item = require('../models/item')

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

function authenticate(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
    // get all the todos and render the index view
    var items = global.currentUser.items;
    console.log('currentUser', global.currentUser);
    res.render('items/index', { items: items });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    var item = {
        name: '',
        type: '',
        avatar_url: '',
        isClean: false,
        color: '',
        material: ''
    };
    res.render('items/new', { item: item });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var item = currentUser.items.id(req.params.id);
    if(!item) return next(makeError(res, 'Document not found', 404));
    res.render('items/show', { item: item });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var item = {
        name: req.body.name,
        type: req.body.type,
        avatar_url: req.body.avatar_url,
        isClean: req.body.completed ? true : false,
        color: req.body.color,
        material: req.body.material
    };
    currentUser.items.push(item);
    currentUser.save()
        .then(function() {
            res.redirect('/items');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var item = currentUser.items.id(req.params.id);
    if(!item) return next(makeError(res, 'Document not found', 404));
    res.render('items/edit', { item: item });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var item = currentUse.items.id(req.params.id);
    if(!item) return next(makeError(res, 'Document not found', 404));
    else{
            item.name = req.body.name;
            item.type = req.body.type;
            item.avatar_url = req.body.avatar_url;
            isClean = req.body.completed ? true : false;
            color: req.body.color;
            material: req.body.material;
            currentUser.save()
            .then(function(saved){
                res.redirect('/items');
            }, function(err){
                return next(err)
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var item = currentUser.items.id(req.params.id);
    if (!item) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.items.indexOf(item);
    currentUser.items.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/items');
        }, function(err) {
            return next(err);
        });
});

// TOGGLE completed
router.get('/:id/toggle', authenticate, function(req, res, next) {
    var item = currentUser.items.findById(req.params.id);
    if (!item) return next(makeError(res, 'Document not found', 404));
    else {
        item.lastWorn = !item.lastWorn;
        item.save()
            .then(function(saved) {
                res.redirect('/items');
            }, function(err) {
                return next(err);
            });
        }ƒ
});

module.exports = router;
