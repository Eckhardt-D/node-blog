const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email }).then(user => {
        if (!user)
          return done(null, false, { message: 'That email is not registered' });

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) =>
          !err && isMatch
            ? done(null, user)
            : done(null, false, { message: 'Password incorrect' })
        );
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
