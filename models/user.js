var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Outfit = require('./outfit');
// var Closet = require('./closet');

var UserSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  },
  outfits : [Outfit.schema]
  // closets : [Closet.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
