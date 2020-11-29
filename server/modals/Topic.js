const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  subForumTopics: {
    type: Array,
    default: ['JavaScript', 'Python']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Topic = mongoose.model('topic', TopicSchema);