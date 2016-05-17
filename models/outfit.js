var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create model outfit
var OutfitSchema = new Schema( {
  name: String,
  items: [ {type: Schema.ObjectId, ref: "Item"} ]
} ); // end OutfitSchema

// make model avail for use
module.exports = mongoose.model('Outfit', OutfitSchema);
