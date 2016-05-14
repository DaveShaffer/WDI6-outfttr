var mongoose = require('mongoose');
var User     = require('./models/user');
var Outfit   = require('./models/outfit');
var Closet   = require('./models/closet');

mongoose.connect('mongodb://localhost/outfttr');

function quit() {
  mongoose.disconnect();
  console.log('\nDone');
}

function handleError(err) {
  console.log('Error: ', err);
  quit();
  return err;
}

console.log('clear user database');
User.remove({})
.then(function(){
  console.log('users cleared');
  var jo   = new User({ name: 'Jo',   email: 'jojo@gmail.com',       password: 'Abcd1234$' });
  var joe  = new User({ name: 'Joe',  email: 'joecool@aol.com',      password: 'Abcd1234$' });
  var jane = new User({ name: 'Jane', email: 'janejams@hotmail.org', password: 'Abcd1234$' });
  return User.create([ jo, joe, jane ]);
})
.then(function(savedUsers) {
  console.log('saved ', savedUsers.length, ' users');
  return User.find({});
})
.then(function(allUsers) {
  console.log('all users: ');
  allUsers.forEach(function(user) {
    console.log(user);
  });
  quit();
});
