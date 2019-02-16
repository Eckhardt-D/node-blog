// Run this file seperately with node to populate the database with placeholder data.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true });
const Post = require('./models/Post');
const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(async data => {
  // log
  console.log('Inserting data');
  for (var i = 0; i < data.length; i++) {
    await Post.create({...data[i], author: 'Eckhardt'})
  }
  console.log('done, disconnecting..');
  mongoose.disconnect()
  .then(() => console.log('DB Disconnected'))
  .catch(e => console.log('Disconnected with error', e));
})
.catch(err => {
  console.log(err)
});