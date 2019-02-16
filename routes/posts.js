const router = require('express').Router();
const {PostController} = require('../database/controllers');
const {UserController} = require('../database/controllers');

// Get the posts route
router.get('/', (req, res) => {
  PostController.getPosts()
  .then(posts => {
    res.render('posts', { posts });
  })
  .catch(err => void console.log(error));
});

// Get the post creation route
router.get('/new', (req, res) => {
  // Must set isNew to render editor
  res.locals.isNew = true;
  res.render('newPost');
});

// Get the single post route
router.get('/:id', (req, res) => {
  PostController.getPost(req.params.id)
  .then(post => {
    res.render('post', {post});
  })
  .catch(e => res.redirect('/posts'));
});

// Get the single post edit route
router.get('/edit/:id', (req, res) => {
  // Find the post
  PostController.getPost(req.params.id)
  .then(post => {
    // Must set isNew to render editor
    res.locals.isNew = true;
    res.render('editPost', {post});
  })
  .catch(e => res.redirect('/posts'));
});

// Add a new post
router.post('/', (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
    author: req.user.name,
    userId: req.user._id.toString()
  };

  PostController.createPost(post)
  .then(post => {
    res.redirect('/posts/' + post._id);
  })
  .catch(e => res.redirect('/posts'));
});

// Edit an existing post
router.put('/:id', (req, res) => {
  const updatedPost = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  PostController.updatePost(req.params.id, updatedPost)
  .then(post => {
    res.redirect('/posts/' + post._id);
  })
  .catch(e => res.redirect('/posts'));
});

// Delete a post from the Database
router.delete('/:id', (req, res) => {
  PostController.deletePost(req.params.id)
  .then(() => {
    res.redirect('/posts');
  })
  .catch(e => res.redirect('/posts'));
})

module.exports = router;
