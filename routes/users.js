var express = require('express');
var router = express.Router();
var User = require('../models/user');

function authenticate(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

/* GET users listing. */
router.get('/', authenticate, function(req, res, next) {
    // get all the users and render the index view
    var users = global.currentUser.users;
    console.log('currentUser', global.currentUser);
    res.render('users/index', { users: users });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    if(!currentUser) return next(makeError(res, 'Document not found', 404));
    res.render('users/show', { user: currentUser });
});


module.exports = router;
