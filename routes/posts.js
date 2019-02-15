const router = require('express').Router();

// Get the posts route
router.get('/', (req, res) => {
  res.send('All Posts');
});

// Get the post creation route
router.get('/new', (req, res) => {
  res.send('New Post');
});

// Get the single post route
router.get('/:id', (req, res) => {
  res.send('Specific Post');
});

// Add a new post
router.post('/new', (req, res) => {
  res.send('Created a post');
});

// Edit an existing post
router.put('/new/:id', (req, res) => {
  res.send('Edited a post');
});

module.exports = router;
