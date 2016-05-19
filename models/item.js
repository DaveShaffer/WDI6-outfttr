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
  color: String,
  material: String,
  outfits: [ {type: Schema.ObjectId, ref: "Outfit"} ],
  users: [ {type: Schema.ObjectId, ref: "User"} ]
}, { timestamps: true});
 // end ItemSchema

function date2String(date){
  var options = {
    weekday:'long', year:'numeric', month: 'short',
    day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'
  };
  return date.toLocaleDateString('en-US', options);
  }

  ItemSchema.methods.getCreatedAt = function() {
    return date2String(this.createdAt);
  };

  ItemSchema.methods.getUpdatedAt = function() {
    return date2String(this.updatedAt);
  };

// make model avail for use
module.exports = mongoose.model('Item', ItemSchema);
