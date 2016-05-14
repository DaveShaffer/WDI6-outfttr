var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
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
  users: [ {type: Schema.ObjectId, ref: "User"} ],
  outfits: [ {type: Schema.ObjectId, ref: "Outfit"} ]
});

module.exports = mongoose.model('Item', ItemSchema);
