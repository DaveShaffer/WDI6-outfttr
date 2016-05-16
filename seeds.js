var mongoose = require('mongoose');
var Outfit = require('./models/outfit');

mongoose.connect('mongodb://localhost/outfttr');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old outfits...');
Outfit.remove({})
.then(function() {
  console.log('old outfits removed');
  console.log('creating some new outfits...');
  var groceries  = new Outfit({ title: 'groceries',    completed: false });
  var feedTheCat = new Outfit({ title: 'feed the cat', completed: true  });
  return Outfit.create([groceries, feedTheCat]);
})
.then(function(savedOutfits) {
  console.log('Just saved', savedOutfits.length, 'outfits.');
  return Outfit.find({});
})
.then(function(allOutfits) {
  console.log('Printing all todos:');
  allTodos.forEach(function(outfit) {
    console.log(outfit);
  });
  return Outfit.findOne({title: 'groceries'});
})
.then(function(groceries) {
  groceries.completed = true;
  return groceries.save();
})
.then(function(groceries) {
  console.log('updated groceries:', groceries);
  return groceries.remove();
})
.then(function(deleted) {
  return Outfit.find({});
})
.then(function(allOutfits) {
  console.log('Printing all outfits:');
  allOutfits.forEach(function(outfit) {
    console.log(outfit);
  });
  quit();
});
