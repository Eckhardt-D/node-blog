/*|----------------------------------------|
  | Node-Blog: 1.0                         |
  | Author: https://github.com/Eckhardt-D  |
  | Description: A fullstack blogging site |
  |----------------------------------------|*/

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const fetch = require('node-fetch');
const { join } = require('path');

// Initialize express app
const app = express();

// Connect Database
require('./database');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

// Initialize middlewares
if(process.env.NODE_ENV === 'development') { app.use(morgan('combined')) }; // Only in development
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
var staticOptions = {
  dotfiles: 'ignore',
  maxAge: '0',
  setHeaders: function (res, _, _) {
    res.set('X-Timestamp', Date.now());
  }
}
app.use('/static', express.static(__dirname + '/public', staticOptions));

// Use router
app.use(routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Export the server for testing only
if(process.env.NODE_ENV === 'test') {
  module.exports = app;
}