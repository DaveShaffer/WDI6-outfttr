var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Objectid;

// create model user
var UserSchema = new Schema( {
  name: String,
  email: {
    type: String,
    match: /.+\@.+\..+/,
    unique: true,
    required: true
  }, // end user email
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./,
    required: true
  }, // end user password
  items: [ {type: Schema.ObjectId, ref: "Item"} ]
} ); // end UserSchema

// make model avail for use
module.exports = mongoose.model('User', UserSchema);
