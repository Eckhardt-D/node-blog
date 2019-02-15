const authMiddleware = require('./authentication');
const inputMiddleware = require('./input');
const sessionMiddleware = require('./session');

module.exports = {
  authMiddleware,
  inputMiddleware,
  sessionMiddleware
};
