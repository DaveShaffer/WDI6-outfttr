var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create model outfit
var OutfitSchema = new Schema( {
  top: String,
  bottom: {
    type: String,
    required: true
  }, // end outfit bottom
  shoes: {
    type: String,
    required: true
  }, // end outfit shoes
  accessory: String,
  picture_url: String,
  lastWorn: Date,
  items: [ {type: Schema.ObjectId, ref: "Item"} ]
} ); // end OutfitSchema

// make model avail for use
module.exports = mongoose.model('Outfit', OutfitSchema);
