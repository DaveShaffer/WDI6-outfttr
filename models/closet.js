var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ClosetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  picture_url: {
    type: String,
    required: true
  },
  isClean: Boolean,
  lastWorn: Date,
  color: String,
  material: String,
  outfits: [ {type: Schema.ObjectId, ref: "Outfit"} ]
});

module.exports = mongoose.model('Closet', ClosetSchema);
