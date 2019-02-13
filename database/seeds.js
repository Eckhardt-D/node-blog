// Run this file seperately with node to populate the database with placeholder data.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-blog');
const Post = require('./models/Post');
const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(data => {
  data.forEach(async post => {
    await Post.create(post);
  })
})
.catch(err => {
  console.log(err)
});