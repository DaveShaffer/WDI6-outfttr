var mongoose  = require('mongoose');
var User      = require('./models/user');
var Outfit    = require('./models/outfit');
var Item      = require('./models/item');

// conncet to database
mongoose.connect('mongodb://localhost/outfttr');

// disconnect from database when done
function quit() {
  mongoose.disconnect();
  console.log('\nDone');
} // end fnc quit

function handleError(err) {
  console.log('Error: ', err);
  quit();
  return err;
} // end fnc handleError

// seed users
  var jo   = new User( {name: 'Jo',   email: 'jojo@gmail.com',       password: 'Abcd1234$'} );
  var joe  = new User( {name: 'Joe',  email: 'joecool@aol.com',      password: 'Abcd1234$'} );
  var jane = new User( {name: 'Jane', email: 'janejams@hotmail.org', password: 'Abcd1234$'} );

  var item1 = new Item ( {name: 'Devil in a Dress', type: 'Dress', avatar: '' })
  var item2 =
  var item3 =

  var outfit1 = new Outfit( { item: [ item1, item2, item3 ] });
