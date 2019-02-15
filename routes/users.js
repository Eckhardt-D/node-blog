const express = require('express');
const router = express.Router();
const passport = require('passport');
const { inputMiddleware, sessionMiddleware } = require('../middleware');

// Login Page
router.get('/login', sessionMiddleware['testIfSession'], (req, res) =>
  res.render('login')
);

// Register Page
router.get('/register', sessionMiddleware['testIfSession'], (req, res) =>
  res.render('register')
);

// Register
router.post('/register', inputMiddleware['testInput'], (req, res) =>
  res.render('login')
);

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout/u/0', (req, res) => {
  req.flash('session_msg', 'You are already logged in');
  res.render('logout');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
