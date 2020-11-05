const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'studentUser'
  },
  text: {
    type: String,
    required: true
  },
  postType: {
    type: String
  },
  name: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'studentUser'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'studentUser'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ForumPost = mongoose.model('forumPost', ForumPostSchema);