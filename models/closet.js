var mongoose = require('mongoose');

var ClosetSchema = new mongoose.Schema({
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
  material: String
});

module.exports = mongoose.model('Closet', ClosetSchema);
