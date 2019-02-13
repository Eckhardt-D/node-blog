const router = require('express').Router();
const { PostController } = require('../database/controllers');

/** Get the home route */
router.get('/', (req, res) => {
  PostController.getPosts()
  .then(data => {
    res.render('index', {data});
  })
  .catch(e => {
    res.render('index', [])
  });
});

module.exports = router;