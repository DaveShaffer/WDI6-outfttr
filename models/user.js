var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    match: /\A[\w+\-.]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*\.[a-z]+\z/i,
    unique: true,
    required: true
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./,
    required: true
  },
  outfits: [ {type: Schema.ObjectId, ref: "Outfit"} ]
});

module.exports = mongoose.model('User', UserSchema);
