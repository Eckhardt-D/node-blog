const router = require('express').Router();

// Get the home route
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
