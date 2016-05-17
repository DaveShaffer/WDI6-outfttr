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

  var item1 = new Item( {name: 'Devil in a Dress', type: 'Dress', avatar_url: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/blue-jelly-icons-people-things/061064-blue-jelly-icon-people-things-dress.png' })
  var item2 = new Item( {name: 'Red Heels', type: 'Shoe', avatar_url: 'http://static.kurtgeiger.us/skin/frontend/kurtgeiger/default/images/homepage/2016/wk19/tile-1-us.jpg' })
  var item3 = new Item( {name: 'Necklace', type: 'Accessory', avatar_url: 'http://cdn-images.farfetch.com/11/23/76/94/11237694_6130048_322.jpg' })

  var outfit1 = new Outfit( { item: [ item1, item2, item3 ] });

  var items = [item1, item2, item3];

  var outfits = [outfit1];

  for(var i = 0; i < outfits.length; i++){
    outfits[i].items.push(items[i]);
    outfits[i].save(function(err){
      if(err){
        console.log(err)
      } else {
        console.log("student was saved");
      }
    })
  };
