var mongoose = require('mongoose');

var OutfitSchema = new mongoose.Schema({
  top: String,
  bottom: {
    type: String,
    required: true
  },
  shoes: {
    type: String,
    required: true
  },
  accessory: String,
  picture_url: String,
  lastWorn: Date,
  users: [ {type: Schema.ObjectId, ref: "User"} ],
  closets: [ {type: Schema.ObjectId, ref: "Closet"} ]
});

module.exports = mongoose.model('Outfit', OutfitSchema);
