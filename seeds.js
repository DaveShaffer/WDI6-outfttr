var mongoose = require('mongoose');
var User     = require('./models/user');
var Outfit   = require('./models/outfit');
var Item   = require('./models/item');

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
console.log('clear user collection');
User.remove( {} )
.then(function() {
  console.log('users cleared');
  var jo   = new User( {name: 'Jo',   email: 'jojo@gmail.com',       password: 'Abcd1234$'} );
  var joe  = new User( {name: 'Joe',  email: 'joecool@aol.com',      password: 'Abcd1234$'} );
  var jane = new User( {name: 'Jane', email: 'janejams@hotmail.org', password: 'Abcd1234$'} );
  return User.create( [jo, joe, jane] );
} ) // end fnc create users
.then(function(savedUsers) {
  console.log('saved ', savedUsers.length, ' users');
  return User.find( {} );
} ) // end fnc savedUsers
.then(function(allUsers) {
  console.log('all users: ');
  allUsers.forEach(function(user) {
    console.log(user);
  } ); // end forEach fnc print users
} ); // end fnc allUsers
// end user seed

// seed items
console.log('clear item collection');
Item.remove( {} )
.then(function() {
  console.log('items cleared');
  var one    = new Item( {name: 'white cotton oxford', type: 'shirt',     color: 'white', material: 'cotton',    isClean: false, lastWorn: 1463200056000, picture_url: 'http://www.baronboutique.com/womens_shirt/oxford_cotton/white_oxford_cotton_shirt.jpg'} );
  var two    = new Item( {name: 'red silk top',        type: 'shirt',     color: 'red',   material: 'silk',      isClean: true,  lastWorn: 1462700076080, picture_url: 'https://cdnd.lystit.com/photos/2013/11/06/ramy-brook-chile-johnny-pleated-stretch-silk-satin-top-product-1-14715293-648068941.jpeg'} );
  var three  = new Item( {name: 'black jeans',         type: 'pants',     color: 'black', material: 'cotton',    isClean: true,  lastWorn: 1460200066070, picture_url: 'http://www.melijoe.com/uk/guess-jeans-p_z_5365_A.jpg?country=IE&currency=EUR'} );
  var four   = new Item( {name: 'beige wool slacks',   type: 'pants',     color: 'beige', material: 'wool',      isClean: true,  lastWorn: 1458600056060, picture_url: 'http://www.canaryrook.com/uploads/products/joseph-abboud-beige-wool-woven-flat-front-straight-leg-pants_bluefly320925101..jpg'} );
  var five   = new Item( {name: 'grey tennis shoes',   type: 'shoes',     color: 'grey',  material: 'cotton',    isClean: true,  lastWorn: 1462700056000, picture_url: 'http://www.tennisexpress.com/prodimages/45590-DEFAULT-l.jpg'} );
  var six    = new Item( {name: 'black boots',         type: 'shoes',     color: 'black', material: 'leather',   isClean: true,  lastWorn: 1463200056000, picture_url: 'https://s-media-cache-ak0.pinimg.com/236x/50/4b/a1/504ba10749d0255a80bafa122234823e.jpg'} );
  var seven  = new Item( {name: 'red cap',             type: 'accessory', color: 'red',   material: 'wool',      isClean: true,  lastWorn: 1460200066070, picture_url: 'http://workingperson.com/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/5/0/50500-305-stormyp1_01.jpg'} );
  var eight  = new Item( {name: 'gold belt',           type: 'accessory', color: 'gold',  material: 'metal',     isClean: true,  lastWorn: 1462700076080, picture_url: 'http://ecdn2.shoptiques.net/products/14846_l.jpg'} );
  var nine   = new Item( {name: 'black bag',           type: 'accessory', color: 'black', material: 'leather',   isClean: true,  lastWorn: 1463200056000, picture_url: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=65127040'} );
  var ten    = new Item( {name: 'blue wool vest',      type: 'accessory', color: 'blue',  material: 'wool',      isClean: true,  lastWorn: 1458600056060, picture_url: 'https://i.s-jcrew.com/is/image/jcrew/03816_BL5894_m?$pdp_fs418$'} );
  var eleven = new Item( {name: 'green dress',         type: 'pants',     color: 'green', material: 'polyester', isClean: true,  lastWorn: 1460200066070, picture_url: 'http://www.rustyzipper.com/full/210885.jpg'} );
  var twelve = new Item( {name: 'christmas sweater',   type: 'shirt',     color: 'red',   material: 'wool',      isClean: true,  lastWorn: 1451000056060, picture_url: 'http://static.squarespace.com/static/5176fdb5e4b083b631f31303/t/52b33d14e4b067ba98947a07/1387478295215/sweater_facts.jpg'} );
  return Item.create( [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve] );
} ) // end fnc create items
.then(function(savedItems) {
  console.log('saved ', savedItems.length, ' items');
  return Item.find( {} );
} ) // end fnc savedItems
.then(function(allItems) {
  console.log('all items: ');
  allItems.forEach(function(item) {
    console.log(item);
  } ); // end forEach fnc print items
} ); // end fnc allItems
// end item seed
