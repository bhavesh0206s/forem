const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tag = mongoose.model('tag', TagSchema);