var express = require('express');
var router = express.Router();
var Item = require('../models/item.js')

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

// INDEX
router.get('/', function(req, res, next) {
    // get all the todos and render the index view
    Item.find({})
        .then(function(items) {
            res.render('items/index', { items: items });
        }, function(err) {
            return next(err);
        });
});

// NEW
router.get('/new', function(req, res, next) {
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
router.get('/:id', function(req, res, next) {
    Item.findById(req.params.id)
        .then(function(item) {
            if (!item) return next(makeError(res, 'Document not found', 404));
            res.render('items/show', { item: item });
        }, function(err) {
            return next(err);
        });
});

// CREATE
router.post('/', function(req, res, next) {
    var item = new Item({
        name: req.body.name,
        type: req.body.type,
        avatar_url: req.body.avatar_url,
        isClean: req.body.completed ? true : false,
        color: req.body.color,
        material: req.body.material
    });
    item.save()
        .then(function() {
            res.redirect('/items');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
    Item.findById(req.params.id)
        .then(function(item) {
            if (!item) return next(makeError(res, 'Document not found', 404));
            res.render('items/edit', { item: item });
        }, function(err) {
            return next(err);
        });
});

// UPDATE
router.put('/:id', function(req, res, next) {
    Item.findById(req.params.id)
        .then(function(item) {
            if (!item) return next(makeError(res, 'Document not found', 404));
            item.name = req.body.name;
            item.type = req.body.type;
            item.avatar_url = req.body.avatar_url;
            isClean = req.body.completed ? true : false;
            color: req.body.color;
            material: req.body.material;
            return item.save();
        })
        .then(function(saved) {
            res.redirect('/items');
        }, function(err) {
            return next(err);
        });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
    Item.findByIdAndRemove(req.params.id)
        .then(function() {
            res.redirect('/items');
        }, function(err) {
            return next(err);
        });
});

// TOGGLE completed
router.get('/:id/toggle', function(req, res, next) {
    Item.findById(req.params.id)
        .then(function(item) {
            if (!item) return next(makeError(res, 'Document not found', 404));
                item.lastWorn = !item.lastWorn;
                item.save()
                    .then(function(saved) {
                        res.redirect('/items');
                    }, function(err) {
                        return next(err);
                    });
        });
});

module.exports = router;
