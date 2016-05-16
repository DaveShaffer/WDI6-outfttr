var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create model item
var ItemSchema = new Schema( {
  name: {
    type: String,
    required: true
  }, // end item name
  type: {
    type: String,
    required: true
  }, // end item type
  avatar_url: {
    type: String,
    required: true
  }, // end item avatar_url
  isClean: Boolean,
  lastWorn: Date,
  color: String,
  material: String,
  outfits: [ {type: Schema.ObjectId, ref: "Outfit"} ]
} ); // end ItemSchema

// make model avail for use
module.exports = mongoose.model('Item', ItemSchema);
