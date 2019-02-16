/*|----------------------------------------|
  | Node-Blog: 1.0                         |
  | Author: https://github.com/Eckhardt-D  |
  | Description: A fullstack blogging site |
  |----------------------------------------|*/

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');

const { authMiddleware } = require('./middleware');
const { join } = require('path');

// Initialize express app
const app = express();

// Passport Config
require('./authentication')(passport);

// Connect Database
require('./database');

// Set view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

// Logs in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Initialize middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'supersecret123',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated on res.locals
app.use((req, res, next) => {
  if(req.isAuthenticated()) {
    res.locals.isAuthenticated = true;
  } else {
    res.locals.isAuthenticated = false;
  }
  next();
});

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set static folder
var staticOptions = {
  dotfiles: 'ignore',
  maxAge: '0', // Set this to 1d in production
  setHeaders: function(res, _, _) {
    res.set('X-Timestamp', Date.now());
  }
};
app.use('/static', express.static(__dirname + '/public', staticOptions));

// Use router
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));
app.use('/posts', authMiddleware['ensureAuthenticated'], require('./routes/posts'));

// Handle 404
app.get('*', function(req, res) {
  res.render('error', { text: 'Page Not Found' });
});

// Handle other 500 errors
app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { text: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Export the server for testing only
if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
