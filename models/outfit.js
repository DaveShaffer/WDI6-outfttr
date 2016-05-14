var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var OutfitSchema = new Schema({
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

  items: [ {type: Schema.ObjectId, ref: "Item"} ]
});

module.exports = mongoose.model('Outfit', OutfitSchema);
