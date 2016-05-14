var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Objectid;

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    match: /.+\@.+\..+/,
    unique: true,
    required: true
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./,
    required: true
  },
  items: [ {type: Schema.ObjectId, ref: "Item"} ]
});

module.exports = mongoose.model('User', UserSchema);
