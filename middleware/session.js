const testIfSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/users/logout/u/0');
  } else {
    next();
  }
};

module.exports = {
  testIfSession
};
