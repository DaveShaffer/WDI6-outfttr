var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var autopopulate = require('mongoose-autopopulate');

// create model outfit
var OutfitSchema = new Schema( {
  name: String,
  items: [ {type: Schema.ObjectId, ref: "Item", autopopulate: true} ]
} ); // end OutfitSchema

OutfitSchema.plugin(autopopulate);

// make model avail for use
module.exports = mongoose.model('Outfit', OutfitSchema);
