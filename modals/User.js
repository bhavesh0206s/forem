const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio:{
    type: String,
  },
  username:{
    type: String,
    default: '',
  },
  picture: {
    type: String,
  }
});

module.exports =  User = mongoose.model('users', userSchema);