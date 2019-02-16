const mongoose = require('mongoose');

// Define Models
const Post = mongoose.model('post', {
  userId: String,
  author: String,
  title: String,
  body: String
});

module.exports = Post