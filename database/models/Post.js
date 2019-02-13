const mongoose = require('mongoose');

// Define Models
const Post = mongoose.model('post', {
  userId: String,
  id: Number,
  title: String,
  body: String
});

module.exports = Post