const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  name: {
    type: String
  },
  username: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  avatar:{
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      reply: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      replyingTo: {
        name: String,
        content: String,
        avatar: String,
      },
      date: {
        type: Date,
        default: Date.now
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ForumPost = mongoose.model('forumPost', ForumPostSchema);